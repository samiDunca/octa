const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  price: { type: Number, required: [true, 'An order must have a price'] },
  date: { type: Date, default: new Date() },
  paid: Number,
  status: { type: String, default: '' },
  provider: { type: String, default: '' },
  comment: { type: String, default: '' },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
