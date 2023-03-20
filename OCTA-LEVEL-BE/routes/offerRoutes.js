const express = require('express');
const offerController = require('./../controllers/offerController');

const router = express.Router();

router.route('/getTableOfferData').get(offerController.getTableOfferData);

module.exports = router;
