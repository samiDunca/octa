const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

const Team = require('./../models/teamModel');
const Montage = require('./../models/montageModel');

exports.getAllTeams = catchAsync(async (req, res, next) => {
  const teams = await Team.aggregate([
    {
      $lookup: {
        from: 'employees',
        localField: 'employees',
        foreignField: '_id',
        as: 'employeesData',
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        employees: {
          $map: {
            input: '$employeesData',
            as: 'employee',
            in: {
              _id: '$$employee._id',
              firstName: '$$employee.firstName',
              lastName: '$$employee.lastName',
            },
          },
        },
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: teams.length,
    data: teams,
  });
});

exports.getTeam = factory.getOne(Team);

exports.addTeam = catchAsync(async (req, res, next) => {
  const { name, employees } = req.body;

  // Create a new team document
  const team = await Team.create({ name, employees });

  // Populate employee details using the aggregation pipeline
  const populatedTeam = await Team.aggregate([
    {
      $match: { _id: team._id },
    },
    {
      $lookup: {
        from: 'employees',
        localField: 'employees',
        foreignField: '_id',
        as: 'employeesData',
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        employees: {
          $map: {
            input: '$employeesData',
            as: 'employee',
            in: {
              _id: '$$employee._id',
              firstName: '$$employee.firstName',
              lastName: '$$employee.lastName',
            },
          },
        },
      },
    },
  ]);

  res.status(201).json({
    status: 'success',
    data: populatedTeam[0],
  });
});

exports.updateTeam = catchAsync(async (req, res, next) => {
  const teamId = req.params.id;
  const { name, employees } = req.body;

  const updatedTeam = await Team.findByIdAndUpdate(
    teamId,
    { name, employees },
    { new: true }
  );

  const populatedTeam = await Team.aggregate([
    { $match: { _id: updatedTeam._id } },
    {
      $lookup: {
        from: 'employees',
        localField: 'employees',
        foreignField: '_id',
        as: 'employeesData',
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        employees: {
          $map: {
            input: '$employeesData',
            as: 'employee',
            in: {
              _id: '$$employee._id',
              firstName: '$$employee.firstName',
              lastName: '$$employee.lastName',
            },
          },
        },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: populatedTeam[0],
    },
  });
});
exports.deleteTeam = catchAsync(async (req, res, next) => {
  const teamId = req.params.id;
  // Remove the team's _id from any montage documents that contain it
  await Montage.updateMany({ team: teamId }, { $unset: { team: '' } });

  // Delete the team document
  await Team.findByIdAndDelete(teamId);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
