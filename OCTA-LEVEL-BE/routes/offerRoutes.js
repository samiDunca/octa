const express = require('express');
const offerController = require('./../controllers/offerController');

const router = express.Router();

router
  .route('/')
  .get(offerController.getAllOffers)
  .post(offerController.addOffer);

router
  .route('/:id')
  .get(offerController.getOffer)
  .put(offerController.updateOffer)
  .delete(offerController.deleteOffer);
// .put(offerController.uploadClientOffer, offerController.updateOffer);

module.exports = router;
