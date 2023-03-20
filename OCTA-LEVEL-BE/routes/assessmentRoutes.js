const express = require('express');
const assessmentController = require('./../controllers/assessmentController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(assessmentController.getAllAssessments)
  .post(assessmentController.addAssessments);

router
  .route('/:id')
  .get(assessmentController.getAssessmentDetails)
  .put(assessmentController.updateAssessmentDetails);
module.exports = router;
