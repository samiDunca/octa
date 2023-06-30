const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'the client must have a name'],
  },
  phone: String,
  address: { type: String, default: '' },
  reference: String,
  comment: String,

  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
