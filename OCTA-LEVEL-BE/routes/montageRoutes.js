const express = require('express');
const montageController = require('./../controllers/montageController');

const router = express.Router();

router
  .route('/')
  .get(montageController.getAllMontages)
  .post(montageController.addMontage);

router
  .route('/:id')
  .get(montageController.getMontage)
  .put(montageController.updateMontage)
  .delete(montageController.deleteMontage);

module.exports = router;
