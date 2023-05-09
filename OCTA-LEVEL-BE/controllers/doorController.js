const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const mongoose = require('mongoose');

const Door = require('./../models/doorModel');
const Client = require('./../models/clientModel');
const Assessment = require('./../models/assessmentModel');
const Montage = require('../models/montageModel');
const Project = require('./../models/projectModel');

exports.getAllDoors = catchAsync(async (req, res, next) => {
  const doors = await Client.aggregate([
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
          { 'project.assessment': { $exists: true } },
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
        door: '$door',
        assessment: '$assessment',
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: doors.length,
    data: doors,
  });
});

exports.getDoor = factory.getOne(Door);
exports.addDoor = factory.createOne(Door);

exports.updateDoor = catchAsync(async (req, res, next) => {
  const updatedDoor = await Door.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (req.body?.delivered === false) {
    let project = await Project.findOne({ door: updatedDoor._id });
    if (project?.montage) {
      await Montage.findByIdAndUpdate(project.montage, {
        mounted: false,
      });
    }
  }

  res.status(200).json({
    status: 'success',
    data: updatedDoor,
  });
});

exports.deleteDoor = factory.deleteOne(Door);
