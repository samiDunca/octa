const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a role must have a name'],
    unique: true,
  },
  //one to many employee
  // employee: { type: mongoose.Schema.Types.ObjectId, ref: 'employee' },
  authorities: [
    'READ_EMPLOYEE',
    'WRITE_EMPLOYEE',
    'READ_ASSESSMENT',
    'WRITE_ASSESSMENT',
    'READ_OFFER',
    'WRITE_OFFER',
    'READ_ORDER',
    'WRITE_ORDER',
    'READ_MONTAGE',
    'WRITE_MONTAGE',
    'READ_CLIENT',
    'WRITE_CLIENT',
    'READ_REPORT',
  ],
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
