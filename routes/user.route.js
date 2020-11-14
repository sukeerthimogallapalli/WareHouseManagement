'use strict';
const express = require('express');
const router = express.Router();

const Auth = require('../middlewares/auth');
const controllers = require('../controllers');
const validator = require('../validators');

router.all('*', validator.ApiKeyValidator.validateApiKey);
router.all('/secure*', Auth.checkHeaderAccessToken);

router.post('/register', validator.UserValidator.validateRegistration, controllers.user.register);
router.post('/login', validator.UserValidator.validateLogin, controllers.user.login);

router.post('/secure/warehouse/create', validator.Warehouse.validateAddWarehouse, controllers.warehouse.createWarehouse);
router.get('/secure/warehouse/list/:key', validator.Warehouse.validateWarehouseKey, controllers.warehouse.listWarehouse);
router.delete('/secure/warehouse/delete/:key', validator.Warehouse.validateWarehouseKey, controllers.warehouse.removeWarehouse);

router.post('/secure/product/create', validator.Product.validateAddProduct, controllers.product.createProduct);
router.get('/secure/product/list/:key', validator.Warehouse.validateWarehouseKey, controllers.product.listProducts);
router.delete('/secure/product/delete/:key', validator.Warehouse.validateWarehouseKey, controllers.product.removeProduct);
router.post('/secure/product/stock', validator.Product.validateStock, controllers.product.addStock);
router.post('/secure/product/unstock', validator.Product.validateUnstock, controllers.product.removeStock);

module.exports = router;
