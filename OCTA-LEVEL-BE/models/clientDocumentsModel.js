const mongoose = require('mongoose');

const clientDocumentsSchema = new mongoose.Schema({
  invoice: { type: String, default: '' },
  warrenty: { type: String, default: '' },
  dataAgreement: { type: String, default: '' },
  idCard: { type: String, default: '' },
});



// clientDocumentsSchema.pre('findOneAndDelete', function (next) {
//   const clientDocumentId = this.getQuery()['_id'];
//   mongoose
//     .model('Client')
//     .deleteOne({ clientDocuments: clientDocumentId }, function (err, result) {
//       if (err) {
//         console.log('upsie dubsie: ', err);
//       } else {
//         console.log('it is done');
//         next();
//       }
//     });
// });

const ClientDocuments = mongoose.model(
  'ClientDocuments',
  clientDocumentsSchema
);

module.exports = ClientDocuments;
