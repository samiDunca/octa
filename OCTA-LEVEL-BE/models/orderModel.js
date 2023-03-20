const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  price: { type: Number, required: [true, 'An order must have a price'] },
  paid: Number,
  value: { type: Number, required: [true, 'An order must have a value'] },
  provider: { type: String, defualt: '' },
  comment: { type: String, defualt: '' },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
