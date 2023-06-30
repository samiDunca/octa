const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  comment: { type: String, default: '' },
  date: Date,
  offerUploadName: String,
  orderIsPlaced: { type: Boolean, default: false },
  offerIsUploaded: { type: Boolean, default: false },
  offersUploaded: { type: Array, default: [] },
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
