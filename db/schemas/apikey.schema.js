'use strict';

const mongoose = require('mongoose');

const ApiKeySchema = new mongoose.Schema({
  application: {
    type: String
  },
  key: {
    type: String
  }
}, {
  versionKey: false,
  timestamps: true
});


module.exports = mongoose.model('ApiKey', ApiKeySchema);