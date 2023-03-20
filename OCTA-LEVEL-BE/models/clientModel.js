const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'the client must have a name'],
  },
  // firstName: {
  //   type: String,
  //   required: [true, 'the client must have a firstName'],
  // },
  // lastName: {
  //   type: String,
  //   required: [true, 'the client must have a lastName'],
  // },
  phone: String,
  address: { type: String, default: '' },
  reference: String,
  //one to one project
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  clientDocuments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClientDocuments',
  },
});



const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
