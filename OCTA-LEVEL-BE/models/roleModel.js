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
  // authorities: [
  //   {
  //     id: 1,
  //     name: 'READ_EMPLOYEE',
  //   },
  //   {
  //     id: 2,
  //     name: 'WRITE_EMPLOYEE',
  //   },
  //   {
  //     id: 3,
  //     name: 'READ_ASSESSMENT',
  //   },
  //   {
  //     id: 4,
  //     name: 'WRITE_ASSESSMENT',
  //   },
  //   {
  //     id: 5,
  //     name: 'READ_OFFER',
  //   },
  //   {
  //     id: 6,
  //     name: 'WRITE_OFFER',
  //   },
  //   {
  //     id: 7,
  //     name: 'READ_ORDER',
  //   },
  //   {
  //     id: 8,
  //     name: 'WRITE_ORDER',
  //   },
  //   {
  //     id: 9,
  //     name: 'READ_MONTAGE',
  //   },
  //   {
  //     id: 10,
  //     name: 'WRITE_ASSESSMENT',
  //   },
  //   {
  //     id: 11,
  //     name: 'WRITE_ASSESSMENT',
  //   },
  //   {
  //     id: 12,
  //     name: 'WRITE_ASSESSMENT',
  //   },
  // ],
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
