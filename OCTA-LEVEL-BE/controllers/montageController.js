const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const mongoose = require('mongoose');

const Montage = require('./../models/montageModel');
const Client = require('./../models/clientModel');
const Team = require('./../models/teamModel');

// exports.getAllMontages = catchAsync(async (req, res, next) => {});

exports.getAllMontages = catchAsync(async (req, res, next) => {
  const montages = await Client.aggregate([
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
      $lookup: {
        from: 'assessments',
        localField: 'project.assessment',
        foreignField: '_id',
        as: 'assessment',
      },
    },
    {
      $unwind: '$assessment',
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
      $match: {
        $or: [
          { 'project.door': { $exists: true } },
          { 'project.montage': { $exists: true } },
        ],
      },
    },
    {
      $lookup: {
        from: 'teams',
        let: { teamId: '$montage.team' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$teamId'] },
            },
          },
        ],
        as: 'montage.team',
      },
    },
    {
      $unwind: { path: '$montage.team', preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: 'employees',
        localField: 'montage.team.employees',
        foreignField: '_id',
        as: 'montage.team.employees',
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
        door: '$door',
        assessment: '$assessment',
        montage: {
          _id: '$montage._id',
          status: '$montage.status',
          DEM: '$montage.DEM',
          comment: '$montage.comment',
          mounted: '$montage.mounted',
          team: {
            _id: '$montage.team._id',
            name: '$montage.team.name',
            employees: {
              $map: {
                input: '$montage.team.employees',
                as: 'employee',
                in: {
                  firstName: '$$employee.firstName',
                  lastName: '$$employee.lastName',
                },
              },
            },
          },
        },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    result: montages.length,
    data: montages,
  });
});
exports.getMontage = factory.getOne(Montage);
exports.addMontage = factory.createOne(Montage);
exports.updateMontage = catchAsync(async (req, res, next) => {
  const montage = await Montage.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  const teams = await Team.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(montage.team) },
    },
    {
      $lookup: {
        from: 'employees',
        localField: 'employees',
        foreignField: '_id',
        as: 'employees',
      },
    },
    {
      $project: {
        name: 1,
        employees: {
          $map: {
            input: '$employees',
            as: 'employee',
            in: {
              firstName: '$$employee.firstName',
              lastName: '$$employee.lastName',
            },
          },
        },
      },
    },
  ]);

  console.log(montage);
  console.log(teams[0]);
  const updatedObject = {
    _id: montage?._id,
    DEM: montage?.DEM,
    status: montage?.status,
    comment: montage?.comment,
    mounted: montage?.mounted,
    team: teams[0],
  };

  res.status(200).json({
    status: 'success',
    data: updatedObject,
  });
});
exports.deleteMontage = factory.deleteOne(Montage);
