const express = require('express');
const offerController = require('./../controllers/offerController');

const router = express.Router();

router
  .route('/')
  .get(offerController.getAllOffers)
  .post(offerController.addOffer);

router.put(
  '/document/deleteSpecificDocuments/:offerId',
  offerController.deleteSpecificDocuments
);

router
  .route('/:id')
  .get(offerController.getOffer)
  .put(offerController.updateOffer)
  .delete(offerController.deleteOffer);

module.exports = router;
