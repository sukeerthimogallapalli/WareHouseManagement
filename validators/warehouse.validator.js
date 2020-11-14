'use strict';
const joi = require('joi');

/**
 * function to validate warehouse data 
 * @param {*} req {
 *                  name:""
 *                 }
 * @param {*} res {
                    "data": {},
                    "success": true,
                    "message": "yahoo! Warehouse created successful",
                    "status": 200
                  }

 * @param {*} next 
 */

const validateAddWarehouse = async (req, res, next) => {
    let reqBody = req.body;
    let schema = joi.object({
        name: joi.string().max(32).required()
    });
    try {
        const value = await schema.validateAsync(reqBody);
        if (value) {
            next()
        } else {
            next({ err: 'Validation Error' })
        }
    } catch (err) {
        next({ err: err })
    }
}
const validateWarehouseKey= async (req, res, next) => {
    
    const schema = joi.object({
        key: joi.string().required()
    });
    try {
        const value = await schema.validateAsync(req.params);
        if (value) {
            next()
        } else {
            next({ err: 'Validation Error' })
        }
    } catch (err) {
        next({ err: err })
    }
}

module.exports = {
    validateAddWarehouse,
    validateWarehouseKey
}