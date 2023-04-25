const Offer = require('./../models/offerModel');
const Client = require('./../models/clientModel');
const Assessment = require('./../models/assessmentModel');
const Project = require('./../models/projectModel');
const ClientDocuments = require('./../models/clientDocumentsModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.getClient = factory.getOne(Client);
exports.getAllClients = factory.getAll(Client);

exports.deleteClient = catchAsync(async (req, res, next) => {
  // 1. populez project dinspre client si obtin ID-urile de sters
  const client = await Client.findById(req.params.id).populate('project');

  const delClientDocuments = await ClientDocuments.findByIdAndDelete(
    client.clientDocuments
  );
  const delAssessment = await Assessment.findByIdAndDelete(
    client.project.assessment
  );
  const delOffer = await Offer.findByIdAndDelete(client.project.offer);
  const delProject = await Project.findByIdAndDelete(client.project._id);
  const delClient = await Client.findByIdAndDelete(client._id);

  const pairDeletedDocuments = {
    delClientDocuments,
    delAssessment,
    delOffer,
    delProject,
    delClient,
  };

  // const clientDocuments = await Model.findByIdAndDelete(clients?.clientDocuments);
  // console.log(clients);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
