const mongoose = require('mongoose');

const montageSchema = new mongoose.Schema({
  status: { type: String, default: '' },
  comment: String,
  DEM: Date,
  mounted: { type: Boolean, default: false },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
});

const Montage = mongoose.model('Montage', montageSchema);

module.exports = Montage;
