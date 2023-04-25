const express = require('express');
const montageController = require('./../controllers/montageController');

const router = express.Router();

router.route('/').get(montageController.getAllMontages);

router.route('/:id').put(montageController.updateMontage);

module.exports = router;
