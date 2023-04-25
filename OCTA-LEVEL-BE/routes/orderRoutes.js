const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router
  .route('/')
  .post(orderController.addOrder)
  .get(orderController.getAllOrders);

router
  .route('/:id')
  .put(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
