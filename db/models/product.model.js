
'use strict';
require('../schemas/Product.product.schema');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('lodash'),
 Product = mongoose.model('Product');


const create = (config = {}) => {
  return new Promise((resolve, reject) => {
    let newProduct = new Product(config);
    newProduct.save((err, doc) => err ? reject(err) : resolve(doc));
  });
};
const read = (query, options = {}) => {
  console.log(query,"sdfghjkl")
  return new Promise((resolve, reject) => {
    if (options.multi) {
      Product.find(query, options.fields)
        .skip(options.skip || 0)
        .limit(options.limit || 0)
        .exec((err, Product) => err ? reject(err) : resolve(Product))
    } else if (options.populate) {
      Product.find(query, options.fields || {})
        .skip(options.skip || 0)
        .limit(options.limit || 0).populate(options.populate.name, options.populate.keys)
        .exec((err, Product) => err ? reject(err) : resolve(Product))
    } else {
      Product.findOne(query, options.fields || {})
        .lean().exec((err, Product) => err ? reject(err) : resolve(Product))
    }
  });
};
const update = (query, update, options = {}) => {
  options = _.extend(options, { upsert: false, runValidators: true });
  return new Promise((resolve, reject) => {
    Product.updateMany(query, update, options)
      .exec((err, doc) => err ? reject(err) : resolve(doc));
  });
};
const deleteProduct = (query) => {
  return new Promise((resolve, reject) => {
    Product.remove(query, (err, Product) => err ? reject(err) : resolve(Product));
  });
};
const count = (query = {}) => {
  return new Promise((resolve, reject) => {
    Product.count(query, (err, count) => err ? reject(err) : resolve(count));
  })
};

const aggregate = pipe => new Promise((resolve, reject) => {
  Product.aggregate(pipe, (err, info) => err ? reject(err) : resolve(info))
});



module.exports = {
  create,
  read,
  update,
  deleteProduct,
  count,
  aggregate
};
