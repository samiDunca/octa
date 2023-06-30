const fs = require('fs');

const Offer = require('./../models/offerModel');
const Client = require('./../models/clientModel');
const Assessment = require('./../models/assessmentModel');
const Project = require('./../models/projectModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllOffers = catchAsync(async (req, res, next) => {
  const offers = await Client.aggregate([
    {
      $lookup: {
        from: 'projects',
        localField: 'project',
        foreignField: '_id',
        as: 'project',
      },
    },
    {
      $unwind: '$project', // ce face unwind ii să scoata project din array, $lookup asta face, aduce proiectul dar il pune intr-un array
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
        from: 'offers',
        localField: 'project.offer',
        foreignField: '_id',
        as: 'offer',
      },
    },
    {
      $unwind: '$offer',
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
        // project: '$project',
        offer: '$offer',
        assessment: '$assessment',
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: offers.length,
    data: offers,
  });
});

exports.addOffer = catchAsync(async (req, res, next) => {
  console.log('id-ul clientului: ', req.headers.clientid);
  const newOffer = await Offer.create({
    ...req.body,
    client: req.headers.clientid,
  });

  res.status(201).json({ status: 'success', data: newOffer });
});

exports.updateOffer = catchAsync(async (req, res, next) => {
  let updatedOffer;

  const offer = await Offer.findById(req.params.id);
  const newOfferObj = req.body;

  if (req.body.name && req.body.location) {
    offer.offersUploaded.push(newOfferObj);
    offer.offerIsUploaded = true;
    offer.date = new Date();
    updatedOffer = await offer.save();
  } else {
    updatedOffer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  }

  console.log({ updatedOffer });

  res.status(200).json({
    status: 'success',
    data: updatedOffer,
  });
});

exports.getOffer = catchAsync(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id);
  const pdfPath = offer.offerUploadName;
  fs.readFile(`${folderFilesPath}/${pdfPath}`, (err, data) => {
    if (err) {
      console.log('in the error: ', err);
      next(new AppError(`${err}`, 400));
    } else {
      console.log('passed the error');
      console.log(data);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=offer.pdf');
      res.send(data);
    }
  });
});

exports.deleteOffer = catchAsync(async (req, res, next) => {
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

  res.status(200).json({
    status: 'success',
    data: pairDeletedDocuments,
  });
});

exports.deleteSpecificDocuments = catchAsync(async (req, res, next) => {
  const documentsLocations = req.body.documentsLocations;
  const updatedOffer = await Offer.findByIdAndUpdate(
    req.params.offerId,
    {
      $pull: { offersUploaded: { location: { $in: documentsLocations } } },
    },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    data: updatedOffer,
  });
});
