const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a role must have a name'],
    unique: true,
  },
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
    'READ_DOOR',
    'WRITE_DOOR',
    'READ_TEAM',
    'WRITE_TEAM',
    'READ_ROLE',
    'WRITE_ROLE',
  ],
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
