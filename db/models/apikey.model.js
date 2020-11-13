'use strict';
require('../schemas/apikey.schema');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('lodash'),
  ApiKey = mongoose.model('ApiKey');


const create = (config = {}) => {
  return new Promise((resolve, reject) => {
    let newApiKey = new ApiKey(config);
    newApiKey.save((err, doc) => err ? reject(err) : resolve(doc));
  });
};
const read = (query, options = {}) => {
  return new Promise((resolve, reject) => {
    if (options.multi) {
      ApiKey.find(query)
        .skip(options.skip || 0)
        .limit(options.limit || 0)
        .exec((err, ApiKey) => err ? reject(err) : resolve(ApiKey))
    } else {
      ApiKey.findOne(query)
        .exec((err, ApiKey) => err ? reject(err) : resolve(ApiKey))
    }
  });
};
const update = (query, update, options = {}) => {
  options = _.extend(options, { upsert: false, runValidators: true });
  return new Promise((resolve, reject) => {
    ApiKey.update(query, update, options)
      .exec((err, doc) => err ? reject(err) : resolve(doc));
  });
};
const deleteApiKey = (query) => {
  return new Promise((resolve, reject) => {
    ApiKey.remove(query, (err, ApiKey) => err ? reject(err) : resolve(ApiKey));
  });
};
const count = (query = {}) => {
  return new Promise((resolve, reject) => {
    ApiKey.count(query, (err, count) => err ? reject(err) : resolve(count));
  })
};


module.exports = {
  create,
  read,
  update,
  deleteApiKey,
  count
};
