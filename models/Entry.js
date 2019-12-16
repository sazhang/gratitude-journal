const mongoose = require('mongoose');

const EntrySchema = mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  reflection: String
});

module.exports = mongoose.model('Entry', EntrySchema);