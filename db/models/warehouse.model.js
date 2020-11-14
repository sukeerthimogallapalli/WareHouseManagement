'use strict';
require('../schemas/warehouse.schema');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('lodash'),
 Warehouse = mongoose.model('Warehouse');


const create = (config = {}) => {
  return new Promise((resolve, reject) => {
    let newWarehouse = new Warehouse(config);
    newWarehouse.save((err, doc) => err ? reject(err) : resolve(doc));
  });
};
const read = (query, options = {}) => {
  console.log(query,options)
  return new Promise((resolve, reject) => {
    if (options.multi) {
      Warehouse.find(query)
        .skip(options.skip || 0)
        .limit(options.limit || 0)
        .exec((err, Warehouse) => err ? reject(err) : resolve(Warehouse))
    } else {
      Warehouse.findOne(query)
        .exec((err, Warehouse) => err ? reject(err) : resolve(Warehouse))
    }
  });
};
const update = (query, update, options = {}) => {
  options = _.extend(options, { upsert: false, runValidators: true });
  return new Promise((resolve, reject) => {
    Warehouse.updateMany(query, update, options)
      .exec((err, doc) => err ? reject(err) : resolve(doc));
  });
};
const deleteWarehouse = (query) => {
  return new Promise((resolve, reject) => {
    Warehouse.remove(query, (err, Warehouse) => err ? reject(err) : resolve(Warehouse));
  });
};
const count = (query = {}) => {
  return new Promise((resolve, reject) => {
    Warehouse.count(query, (err, count) => err ? reject(err) : resolve(count));
  })
};

const aggregate = pipe => new Promise((resolve, reject) => {
  Warehouse.aggregate(pipe, (err, info) => err ? reject(err) : resolve(info))
});



module.exports = {
  create,
  read,
  update,
  deleteWarehouse,
  count,
  aggregate
};
