const express = require('express');
const roleController = require('./../controllers/roleController');

const router = express.Router();

router.route('/').get(roleController.getAllRoles).post(roleController.addRole);

router
  .route('/:id')
  .get(roleController.getRole)
  .put(roleController.updateRole)
  .delete(roleController.deleteRole);

module.exports = router;
