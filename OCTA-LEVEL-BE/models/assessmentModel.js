const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  date: { type: Date, default: new Date() },
  width: Number,
  height: Number,
  ceiling: Number,
  panel: { type: String, default: '' },
  color: { type: String, default: '' },
  engine: { type: Boolean, default: false },
  highLift: { type: Boolean, default: false },
  angle: Number,
  quantity: Number,
  handle: { type: Boolean, default: false },
  latch: { type: Boolean, default: false },
  crisisLatch: { type: Boolean, default: false },
  comment: { type: String, default: '' },
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;
