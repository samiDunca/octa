const express = require('express');
const teamController = require('./../controllers/teamController');

const router = express.Router();

router.route('/').get(teamController.getAllTeams).post(teamController.addTeam);

router
  .route('/:id')
  .get(teamController.getTeam)
  .put(teamController.updateTeam)
  .delete(teamController.deleteTeam);

module.exports = router;
