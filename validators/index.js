'use strict'
const ApiKeyValidator = require('./apikey.validator');
const UserValidator = require('./user.validator');
const Warehouse = require('./warehouse.validator');
const Product = require('./product.validator');



module.exports = {
    ApiKeyValidator,
    UserValidator,
    Warehouse,
    Product
}