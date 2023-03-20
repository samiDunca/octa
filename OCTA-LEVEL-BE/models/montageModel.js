const mongoose = require('mongoose');

const montageSchema = new mongoose.Schema({
  date: { type: Date, required: [true, 'montage must have a date'] },
  status: { type: String, required: [true, 'montage must have a status'] },
  comment: String,
  //many to many - employees
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
  //one to one - project
});

const Montage = mongoose.model('Montage', montageSchema);

module.exports = Montage;
