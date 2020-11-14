'use strict';
const joi = require('joi');
const models = require('../db/models');
joi.objectId = require('joi-objectid')(joi)


const validateAddProduct = async (req, res, next) => {
    let reqBody = req.body;
    let schema = joi.object({
        name: joi.string().max(32).required(),
        warehouseId: joi.objectId().required(),
        price: joi.number().min(1).required(),
        quantity: joi.number().min(0).required(),
    });
    try {
        const value = await schema.validateAsync(reqBody);
        const isValidWarehouse = await models.Warehouse.read({ _id: reqBody.warehouseId, status: "active" })

        if (isValidWarehouse) {
            next()
        } else {
            next({ err: 'SEND_VALID_WAREHOUSE' })
        }
    } catch (err) {
        next({ err: err })
    }
}
const validateStock = async (req, res, next) => {
    let reqData = req.body;
    let schema = joi.object({
        warehouseId: joi.objectId().required(),
        productId: joi.objectId().required(),
        quantity: joi.number().min(1).required()
    });
    try {
        const value = await schema.validateAsync(reqData);
        const isValidWarehouse = await models.Warehouse.read({ _id: reqData.warehouseId, status: "active" })
        const isValidProduct = await models.Product.read({ _id: reqData.productId, warehouseId: reqData.warehouseId, status: "active" })

        if (isValidWarehouse && isValidProduct ) {
            reqData.productAvailquantity=isValidProduct.quantity
            next()
        } else {
            next({ err: 'SEND_VALID_DATA' })
        }
    } catch (err) {
        next({ err: err })
    }
}
const validateUnstock = async (req, res, next) => {
    let reqData = req.body;
    let schema = joi.object({
        warehouseId: joi.objectId().required(),
        productId: joi.objectId().required(),
        quantity: joi.number().min(1).required()
    });
    try {
        const value = await schema.validateAsync(reqData);
        const isValidWarehouse = await models.Warehouse.read({ _id: reqData.warehouseId, status: "active" })
        const isValidProduct = await models.Product.read({ _id: reqData.productId, warehouseId: reqData.warehouseId, status: "active" })

        if (isValidWarehouse && isValidProduct && isValidProduct.quantity>=reqData.quantity) {
            reqData.productAvailquantity=isValidProduct.quantity
            next()
        } else {
            next({ err: 'SEND_VALID_DATA' })
        }
    } catch (err) {
        next({ err: err })
    }
}
module.exports = {
    validateAddProduct,
    validateStock,
    validateUnstock
}