const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;
