'use strict';


const User = require('./user.model');
const Apikey = require('./apikey.model');
const Warehouse = require('./warehouse.model');
const Product = require('./product.model');
const ProductInventory = require('./product.inventory.model');


module.exports={
   
    User,
    Apikey,
    Warehouse,
    Product,
    ProductInventory
}