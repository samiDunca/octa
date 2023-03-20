const express = require('express');
const employeeController = require('./../controllers/employeeController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router
  .route('/')
  .get(authController.protect, employeeController.getAllEmployees)
  .post(employeeController.addEmployee);

router
  .route('/:id')
  .get(employeeController.getEmployee)
  .put(employeeController.updateEmployee)
  .delete(
    authController.protect,
    authController.restrictTo('Admin'),
    employeeController.deleteEmployee
  );

module.exports = router;
