'use strict';
require('../schemas/blacklist.token.schema');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('lodash'),
  BlacklistToken = mongoose.model('BlacklistToken');


const create = (config = {}) => {
  return new Promise((resolve, reject) => {
    let newBlacklistToken = new BlacklistToken(config);
    newBlacklistToken.save((err, doc) => err ? reject(err) : resolve(doc));
  });
};
const read = (query, options = {}) => {
  return new Promise((resolve, reject) => {
    if (options.multi) {
      BlacklistToken.find(query)
        .skip(options.skip || 0)
        .limit(options.limit || 0)
        .exec((err, BlacklistToken) => err ? reject(err) : resolve(BlacklistToken))
    } else {
      BlacklistToken.findOne(query)
        .exec((err, BlacklistToken) => err ? reject(err) : resolve(BlacklistToken))
    }
  });
};
const update = (query, update, options = {}) => {
  options = _.extend(options, { upsert: false, runValidators: true });
  return new Promise((resolve, reject) => {
    BlacklistToken.update(query, update, options)
      .exec((err, doc) => err ? reject(err) : resolve(doc));
  });
};
const deleteBlacklistToken = (query) => {
  return new Promise((resolve, reject) => {
    BlacklistToken.remove(query, (err, BlacklistToken) => err ? reject(err) : resolve(BlacklistToken));
  });
};
const count = (query = {}) => {
  return new Promise((resolve, reject) => {
    BlacklistToken.count(query, (err, count) => err ? reject(err) : resolve(count));
  })
};


module.exports = {
  create,
  read,
  update,
  deleteBlacklistToken,
  count
};
