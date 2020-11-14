'use strict'

const models = require('../db/models')
const services = require('../services')

const createProduct = async (req, res, next) => {
    try {
        const reqBody = req.body
        return models.Product.create({
            status: 'active',
            createdBy: req.User.userId,
            name: reqBody.name,
            price:Number(reqBody.price),
            quantity:Number(reqBody.quantity),
            warehouseId: reqBody.warehouseId
        }).then(info => {
            if (info) {
                res.body = {
                    message: 'PRODUCT_SUCC',
                    data: info
                }
                next()
            }
        }).catch(next)
    } catch (e) {
        next({ err: e })
    }
};
const listProducts = async (req, res, next) => {
    try {
        const reqParam = req.params, reqQuery = req.query;
        let productData;
        let query = reqParam.key.toLowerCase() === 'all' ? {} : { warehouseId: reqParam.key };
        !!reqQuery.status ? query.status = reqQuery.status : query
        console.log(query,{ multi: true, skip: Number(req.query.skip) || 0, limit: Number(req.query.limit) || 10 })
        return models.Product.read(
            query,
            { multi: true, skip: Number(req.query.skip) || 0, limit: Number(req.query.limit) || 10 }
        ).then(info => {
            productData = info;
            return models.Product.count(reqQuery.status ? { status: reqQuery.status } : {})
        }).then(info => {
            res.body = {
                data: {
                    data: productData,
                    count: info
                },
                message: 'SUCCESS'
            }
            next()
        }).catch(next)
    } catch (e) {
        next({ err: e })
    }
};
const removeProduct = async (req, res, next) => {
    try {
        const reqParam = req.params;
        return models.Product.update({ _id: reqParam.key }, {
            $set: {
                status: 'blocked',
                blockedBy: req.User.userId
            }
        }).then(info => {
            if (info && info.nModified) {
                res.body = {
                    message: 'SUCCESS'
                }
                next()
            } else {
                throw new Error('PLZ_SEND_VALID_DATA')
            }

        }).catch(next)
    } catch (e) {
        next({ err: e })
    }

};

const addStock = async (req, res, next) => {
    try {
        const reqData = req.body;

        return models.ProductInventory.create({
            warehouseId: reqData.warehouseId,
            productId: reqData.productId,
            quantity: Number(reqData.quantity),
            status: 'approved',
            type: 'STOCK_IN',
            createdBy: req.User.userId
        }).then(info => {
            if (info) {
                return models.Product.update({ _id: reqData.productId, status: 'active' }, { $inc: { quantity: reqData.quantity } })
            } else {
                throw new Error('PLZ_TRY_AGAIN')
            }
        }).then(info => {
            if (info) {
                res.body = {
                    message: 'ADD_STOCK_SUCC'
                }
                next()
            } else {
                throw new Error('PLZ_TRY_AGAIN')
            }

        }).catch(next)
    } catch (e) {
        next({ err: e })
    }

};
const removeStock = async (req, res, next) => {
    try {
        const reqData = req.body;

        return models.ProductInventory.create({
            warehouseId: reqData.warehouseId,
            productId: reqData.productId,
            quantity: Number(reqData.quantity),
            status: 'approved',
            type: 'STOCK_OUT',
            createdBy: req.User.userId
        }).then(info => {
            if (info) {
                return models.Product.update(
                    { _id: reqData.productId, status: 'active' },
                    {
                        $set: {
                            quantity: (Number(reqData.productAvailquantity) - Number(reqData.quantity))
                        }
                    })
            } else {
                throw new Error('PLZ_TRY_AGAIN')
            }
        }).then(info => {
            if (info && info.nModified) {
                res.body = {
                    message: 'ADD_UNSTOCK_SUCC'
                }
                next()
            } else {
                throw new Error('PLZ_TRY_AGAIN')
            }

        }).catch(next)
    } catch (e) {
        next({ err: e })
    }

};


module.exports = {
    createProduct,
    listProducts,
    removeProduct,
    addStock,
    removeStock
}