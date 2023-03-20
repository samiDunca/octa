const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer' },
  montage: { type: mongoose.Schema.Types.ObjectId, ref: 'Montage' },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' },
  journal: { type: mongoose.Schema.Types.ObjectId, ref: 'Journal' },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
