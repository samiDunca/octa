const mongoose = require('mongoose');

const doorSchema = new mongoose.Schema({
  date: Date,
  providers: ['Atu Tech', 'Suntech', 'Salamander System'],
  DEL: Date,
  comment: { type: String, default: '' },
});

const Door = mongoose.model('Door', doorSchema);

module.exports = Door;
