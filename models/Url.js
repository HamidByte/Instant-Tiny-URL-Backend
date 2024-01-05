const mongoose = require('mongoose');
const { baseURL } = require('../config/serverConfig');

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
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

// Virtual property to generate shortUrl based on longUrl and shortId
urlSchema.virtual('shortUrl').get(function () {
  return `${baseURL}/${this.shortId}`;
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;