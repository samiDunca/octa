const mongoose = require('mongoose');

const clientDocumentsSchema = new mongoose.Schema({
  invoice: { type: String, default: '' },
  warrenty: { type: String, default: '' },
  dataAgreement: { type: String, default: '' },
  idCard: { type: String, default: '' },
});

const ClientDocuments = mongoose.model(
  'ClientDocuments',
  clientDocumentsSchema
);

module.exports = ClientDocuments;
