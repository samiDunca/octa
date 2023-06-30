const Offer = require('./../models/offerModel');
const Client = require('./../models/clientModel');
const Assessment = require('./../models/assessmentModel');
const Project = require('./../models/projectModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.getAllClients = catchAsync(async (req, res, next) => {
  const clients = await Client.aggregate([
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
        from: 'offers',
        localField: 'project.offer',
        foreignField: '_id',
        as: 'offer',
      },
    },
    {
      $unwind: {
        path: '$offer',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        phone: { $first: '$phone' },
        address: { $first: '$address' },
        offer: { $first: '$offer' },
      },
    },
    {
      $sort: {
        name: 1,
      },
    },
    {
      $project: {
        _id: 0,
        client: {
          _id: '$_id',
          name: '$name',
          phone: '$phone',
          address: '$address',
        },
        offer: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: clients.length,
    clients,
  });
});
exports.getClient = factory.getOne(Client);
exports.updateClient = factory.updateOne(Client);

exports.deleteClient = catchAsync(async (req, res, next) => {
  // 1. populez project dinspre client si obtin ID-urile de sters
  const client = await Client.findById(req.params.id).populate('project');

  const delAssessment = await Assessment.findByIdAndDelete(
    client.project.assessment
  );
  const delOffer = await Offer.findByIdAndDelete(client.project.offer);
  const delProject = await Project.findByIdAndDelete(client.project._id);
  const delClient = await Client.findByIdAndDelete(client._id);

  const pairDeletedDocuments = {
    delAssessment,
    delOffer,
    delProject,
    delClient,
  };

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
