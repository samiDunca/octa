const express = require('express');
const doorController = require('./../controllers/doorController');

const router = express.Router();

router
  .route('/')
  .get(doorController.getAllDoors)
  .post(doorController.updateDoor);

router
  .route('/:id')
  .put(doorController.updateDoor)
  .delete(doorController.deleteDoor);

module.exports = router;
