const catchAsync = require('./../utils/catchAsync');
const factory = require('./../controllers/handlerFactory');
const { orderStatusHandler } = require('../utils/orderStatus');

const Order = require('./../models/orderModel');
const Offer = require('./../models/offerModel');
const Client = require('./../models/clientModel');
const Assessment = require('./../models/assessmentModel');
const Project = require('./../models/projectModel');
const ClientDocuments = require('./../models/clientDocumentsModel');
const Montage = require('../models/montageModel');
const Door = require('./../models/doorModel');

exports.getOrder = factory.getOne(Order);

exports.getAllOrders = catchAsync(async (req, res, next) => {
  // acest agregate creaza un array cu obiecte ce contin fiecare "client, order, montage"
  // comanda = doar clientii pentru care exista in project un order si un montage asociat

  const orders = await Client.aggregate([
    {
      $match: {
        project: { $exists: true },
      },
    },
    {
      $lookup: {
        from: 'projects',
        localField: 'project',
        foreignField: '_id',
        as: 'project',
      },
    },
    {
      $unwind: '$project',
    },
    {
      $lookup: {
        from: 'orders',
        localField: 'project.order',
        foreignField: '_id',
        as: 'order',
      },
    },
    {
      $unwind: '$order',
    },
    {
      $lookup: {
        from: 'montages',
        localField: 'project.montage',
        foreignField: '_id',
        as: 'montage',
      },
    },
    {
      $unwind: '$montage',
    },
    {
      $lookup: {
        from: 'doors',
        localField: 'project.door',
        foreignField: '_id',
        as: 'door',
      },
    },
    {
      $unwind: '$door',
    },

    {
      $match: {
        $or: [
          { 'project.order': { $exists: true } },
          { 'project.montage': { $exists: true } },
          { 'project.door': { $exists: true } },
        ],
      },
    },
    {
      $project: {
        _id: 0,
        client: {
          name: '$name',
          address: '$address',
          phone: '$phone',
          _id: '$_id',
        },
        order: '$order',
        montage: '$montage',
        door: '$door',
      },
    },
  ]);

  const updatedData = await orderStatusHandler(orders);
  console.log(updatedData);

  res.status(200).json({
    status: 'success',
    result: orders.length,
    data: updatedData,
  });
});

exports.addOrder = catchAsync(async (req, res, next) => {
  // payment = {price, paid}
  const { clientId, DEM, payment } = req.body;

  const client = await Client.findById(clientId);
  console.log({ client });
  const project = await Project.findById(client.project);

  const montage = await Montage.create({ DEM });
  const door = await Door.create({ date: new Date() });
  const order = await Order.create(payment);
  await Project.findByIdAndUpdate(project._id, {
    order,
    montage,
    door,
  });

  res.status(201).json({
    status: 'success',
    data: { client, order, montage },
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: 'success',
    data: updatedOrder,
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const orderId = req.params.id;

  const project = await Project.findOne({ order: orderId });
  console.log(project);
  const montageId = project.montage;
  const doorId = project.door;
  const offerId = project.offer;

  const deletedOrder = await Order.findByIdAndDelete(orderId);
  const deleteMontage = await Montage.findByIdAndDelete(montageId);
  const deleteDoor = await Door.findByIdAndDelete(doorId);
  await Offer.findByIdAndUpdate(offerId, {
    orderIsPlaced: false,
  });

  // await Project.updateOne({ order: orderId }, { $unset: { order: 1 } });
  await Project.findByIdAndUpdate(project._id, {
    $unset: { order: 1, montage: 1, door: 1 },
  });

  res.status(204).json({ message: 'Order deleted successfully' });
});
