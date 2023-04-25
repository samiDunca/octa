const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const Montage = require('./../models/montageModel');

// exports.getAllMontages = catchAsync(async (req, res, next) => {});

exports.getAllMontages = factory.getAll(Montage);
exports.getMontage = factory.getOne(Montage);
exports.addMontage = factory.createOne(Montage);
exports.updateMontage = factory.updateOne(Montage);
exports.deleteMontage = factory.deleteOne(Montage);
