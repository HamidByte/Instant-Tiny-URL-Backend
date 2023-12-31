const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  longUrl: String,
  shortUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  visitCount: {
    type: Number,
    default: 0,
  },
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;