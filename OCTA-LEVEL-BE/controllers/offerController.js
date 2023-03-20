const Offer = require('./../models/offerModel');
const Client = require('./../models/clientModel');
const catchAsync = require('./../utils/catchAsync');
const { restrictTo } = require('./authController');

exports.getTableOfferData = catchAsync(async (req, res, next) => {
  const clientModel = await Client.find();
  if (clientModel) {
    console.log(clientModel);
    let tableOfferObj = {};
    clientModel.forEach((client) => {
      let documents = {};
      // client.clientDocuments?.forEach((doc) => {
      //   documents.documents = doc;
      // });

      tableOfferObj = {
        firstName: client.firstName,
        lastName: client.lastName,
        clientId: client._id,
        phone: client.phone,
        data: client.project?.date,
        comanda: 'dropdown',
        oferta: ['trimis', 'de trimis'],
        masura: client.project.assessment?._id,
      };
    });
    console.log(tableOfferObj);
    // const newOffer = await Offer.create(tableOfferObj);
    res.status(200).json({
      status: 'success',
      data: tableOfferObj,
    });
  } else {
    res.status(200).json({
      status: 'success',
      message: 'ii gol clientul',
    });
  }
});
