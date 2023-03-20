const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  journal: { type: mongoose.Schema.Types.ObjectId, ref: 'Journal' },
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;
