const Assessment = require('./../models/assessmentModel');
const Offer = require('./../models/offerModel');
const Project = require(`./../models/projectModel`);
const Client = require('./../models/clientModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');

exports.getAllAssessments = catchAsync(async (req, res, next) => {
  const clients = await Client.find().populate({
    path: 'project',
  });
  const assessments = await Assessment.find();
  const assessmentClientPairs = [];

  clients.map((client) => {
    assessments.map((assessment) => {
      if (client.project.assessment.toString() === assessment._id.toString()) {
        const assessmentClientPair = {
          assessment,
          client,
        };

        assessmentClientPairs.push(assessmentClientPair);
      }
    });
  });

  res.status(200).json({
    status: 'succes',
    results: assessmentClientPairs.length,
    data: assessmentClientPairs,
  });
});

exports.addAssessments = catchAsync(async (req, res, next) => {
  const newAssessment = await Assessment.create({});

  const newOffer = await Offer.create({});

  const newProject = await Project.create({
    assessment: newAssessment._id,
    offer: newOffer._id,
  });

  const newClient = await Client.create({
    ...req.body,
    project: newProject._id,
  });

  const assessmentClientPair = {
    assessment: newAssessment,
    client: newClient,
  };

  res.status(201).json({ status: 'succes', data: assessmentClientPair });
});

exports.updateAssessmentDetails = catchAsync(async (req, res, next) => {
  const assessmentClientPair = {};

  const updatedAssessment = await Assessment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  const clients = await Client.find().populate({
    path: 'project',
  });

  clients.map((client) => {
    if (
      client.project.assessment.toString() === updatedAssessment._id.toString()
    ) {
      assessmentClientPair.assessment = updatedAssessment;
      assessmentClientPair.client = client;
    }
  });

  res.status(200).json({ status: 'succes', data: assessmentClientPair });
});

exports.getAssessmentDetails = factory.getOne(Assessment);
