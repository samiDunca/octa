const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  comment: { type: String, default: '' },
  date: Date,
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
