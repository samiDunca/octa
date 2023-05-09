const mongoose = require('mongoose');

const doorSchema = new mongoose.Schema({
  date: Date,
  provider: String,
  DEL: Date,
  comment: String,
  delivered: { type: Boolean, default: false },
});

const Door = mongoose.model('Door', doorSchema);

module.exports = Door;
