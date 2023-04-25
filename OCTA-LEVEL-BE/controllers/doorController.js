const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const Door = require('./../models/doorModel');

exports.getAllDoors = factory.getAll(Door);
exports.getDoor = factory.getOne(Door);
exports.addDoor = factory.createOne(Door);
exports.updateDoor = factory.updateOne(Door);
exports.deleteDoor = factory.deleteOne(Door);
