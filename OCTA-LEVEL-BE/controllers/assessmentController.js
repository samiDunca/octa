const Assessment = require('./../models/assessmentModel');
const Offer = require('./../models/offerModel');
const Project = require(`./../models/projectModel`);
const ClientDocuments = require('./../models/clientDocumentsModel');
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

  res
    .status(200)
    .json({
      status: 'succes',
      results: assessmentClientPairs.length,
      data: assessmentClientPairs,
    });
});

exports.addAssessments = catchAsync(async (req, res, next) => {
  // 1. cream assessment
  const newAssessment = await Assessment.create({});

  // 2. cream offer
  const newOffer = await Offer.create({});

  // 3. cream project cu assessmentID
  const newProject = await Project.create({
    assessment: newAssessment._id,
    offer: newOffer._id,
  });

  // 4. cream clientDoc
  const newClientDocuments = await ClientDocuments.create({});

  // 5. cream client cu projectID si clientDocID
  const newClient = await Client.create({
    ...req.body,
    project: newProject._id,
    clientDocuments: newClientDocuments._id,
  });

  const assessmentClientPair = {
    assessment: newAssessment,
    client: newClient,
  };

  res.status(201).json({ status: 'succes', data: assessmentClientPair });
});

exports.updateAssessmentDetails = catchAsync(async (req, res, next) => {
  const assessmentClientPair = {};

  // 1. update assessment
  const updatedAssessment = await Assessment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true } // ca sa imi returneze resursa updatata, altfel mi-o da pe aia veche
  );

  // 2. get all clients
  const clients = await Client.find().populate({
    path: 'project',
  });

  // 3. loop throw clients and create the response
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
