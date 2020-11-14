
'use strict';
require('../schemas/product.inventory.schema');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('lodash'),
 ProductInventory = mongoose.model('ProductInventory');


const create = (config = {}) => {
  return new Promise((resolve, reject) => {
    let newProductInventory = new ProductInventory(config);
    newProductInventory.save((err, doc) => err ? reject(err) : resolve(doc));
  });
};
const read = (query, options = {}) => {
  console.log(query,"sdfghjkl")
  return new Promise((resolve, reject) => {
    if (options.multi) {
      ProductInventory.find(query, options.fields)
        .skip(options.skip || 0)
        .limit(options.limit || 0)
        .exec((err, ProductInventory) => err ? reject(err) : resolve(ProductInventory))
    } else if (options.populate) {
      ProductInventory.find(query, options.fields || {})
        .skip(options.skip || 0)
        .limit(options.limit || 0).populate(options.populate.name, options.populate.keys)
        .exec((err, ProductInventory) => err ? reject(err) : resolve(ProductInventory))
    } else {
      ProductInventory.findOne(query, options.fields || {})
        .lean().exec((err, ProductInventory) => err ? reject(err) : resolve(ProductInventory))
    }
  });
};
const update = (query, update, options = {}) => {
  options = _.extend(options, { upsert: false, runValidators: true });
  return new Promise((resolve, reject) => {
    ProductInventory.updateMany(query, update, options)
      .exec((err, doc) => err ? reject(err) : resolve(doc));
  });
};
const deleteProductInventory = (query) => {
  return new Promise((resolve, reject) => {
    ProductInventory.remove(query, (err, ProductInventory) => err ? reject(err) : resolve(ProductInventory));
  });
};
const count = (query = {}) => {
  return new Promise((resolve, reject) => {
    ProductInventory.count(query, (err, count) => err ? reject(err) : resolve(count));
  })
};

const aggregate = pipe => new Promise((resolve, reject) => {
  ProductInventory.aggregate(pipe, (err, info) => err ? reject(err) : resolve(info))
});



module.exports = {
  create,
  read,
  update,
  deleteProductInventory,
  count,
  aggregate
};
