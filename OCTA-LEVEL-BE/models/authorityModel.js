const mongoose = require('mongoose');

const authoritySchema = new mongoose.Schema({
  name: { type: String, required: [true, 'the authority must have a name'] },
});

const Authority = mongoose.model('Authority', authoritySchema);

module.exports = Authority;
