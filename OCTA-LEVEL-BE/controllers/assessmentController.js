const Assessment = require('./../models/assessmentModel');
const Project = require(`./../models/projectModel`);
const ClientDocuments = require('./../models/clientDocumentsModel');
const Client = require('./../models/clientModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
// const assessments = { nume: 'sami' };

exports.getAssessmentDetails = factory.getOne(Assessment);
exports.updateAssessmentDetails = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  console.log(req.headers.clientid);
  const updatedAssessment = await Assessment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true } // ca sa imi returneze resursa updatata, altfel mi-o da pe aia veche
  );

  const updatedClient = await Client.findById(req.headers.idclient);

  // console.log(updatedAssessment);

  res.status(200).json({
    status: 'success',
    data: updatedClient,
  });
});

exports.getAllAssessments = catchAsync(async (req, res, next) => {
  const clientData = await Client.find().populate('project').exec();

  // newEmployee = await newEmployee.populate('role').execPopulate();
  // await clientData.aggregate([{ $addFields: { key: '$_id' } }]);
  // const allClients = clientData.map((cl) => {
  //   console.log(cl.project);
  //   return cl.project;
  // });
  // console.log(allClients);
  res.status(200).json({ status: 'succes', data: clientData });
});

exports.addAssessments = catchAsync(async (req, res, next) => {
  const newAssessment = await Assessment.create(req.body);
  const newProject = await Project.create({ assessment: newAssessment._id });

  const newClientDocumentsModel = await ClientDocuments.create(req.body);
  let newClient = await Client.create({
    ...req.body,
    project: newProject,
    clientDocuments: newClientDocumentsModel,
  });

  res.status(201).json({ status: 'succes', data: newClient });
});
