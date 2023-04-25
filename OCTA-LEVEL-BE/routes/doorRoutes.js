const express = require('express');
const doorController = require('./../controllers/doorController');

const router = express.Router();

router.route('/').get(doorController.getAllDoors);

router.route('/:id').put(doorController.updateDoor);

module.exports = router;
