'use strict';
const ApiKey = require('./apikey.schema');
const User = require('./user.schema');
const Warehouse = require('./warehouse.schema');
const Product = require('./product.schema');
const ProductInventory = require('./product.inventory.schema');


module.exports = {
    ApiKey,
    User,
    Warehouse,
    Product,
    ProductInventory
}