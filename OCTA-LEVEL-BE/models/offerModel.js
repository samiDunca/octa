const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  comment: { type: String, default: '' },
  date: Date,
  offerUploadName: String,
  offerIsUploaded: { type: Boolean, default: false },
  orderIsPlaced: { type: Boolean, default: false },
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
