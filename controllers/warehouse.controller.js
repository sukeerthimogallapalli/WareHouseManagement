'use strict'

const models = require('../db/models')

const createWarehouse = async (req, res, next) => {
    try {
        const reqBody = req.body
        return models.Warehouse.create({
            status: 'active',
            createdBy: req.User.userId,
            name: reqBody.name
        }).then(info => {
            if (info) {
                res.body = {
                    message: 'WAREHOUSE_SUCC',
                    data: info
                }
                next()
            }
        }).catch(next)
    } catch (e) {
        next({ err: e })
    }
};
const listWarehouse = async (req, res, next) => {
    try {
        const reqParam = req.params, reqQuery = req.query;
        let warehouseData;
        let query = reqParam.key.toLowerCase() === 'all' ? {} : { _id: reqParam.key };
        reqQuery.status ? query.status = reqQuery.status : query
        return models.Warehouse.read(
            query,
            { multi: true, skip: Number(req.query.skip) || 0, limit: Number(req.query.limit) || 10 }
        ).then(info => {
            warehouseData = info;
            return models.Warehouse.count({})
        }).then(info => {
            res.body = {
                data: {
                    data: warehouseData,
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
const removeWarehouse = async (req, res, next) => {
    try {
        const reqParam = req.params;
        return models.Warehouse.update({ _id: reqParam.key }, {
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
module.exports = {
    createWarehouse,
    listWarehouse,
    removeWarehouse
}