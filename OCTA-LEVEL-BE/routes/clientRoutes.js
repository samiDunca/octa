const express = require('express');
const clientController = require('./../controllers/clientController');

const router = express.Router();

router.route('/').get(clientController.getAllClients);

router
  .route('/:id')
  .put(clientController.updateClient)
  .get(clientController.getClient)
  .delete(clientController.deleteClient);
// .put(offerController.uploadClientOffer, offerController.updateOffer);

module.exports = router;
