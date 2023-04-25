const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'the team must have a name'],
  },

  // many to many team - employeee
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;

// many to many relationship
// employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
// montage: { type: mongoose.Schema.Types.ObjectId, ref: 'Montage' },
