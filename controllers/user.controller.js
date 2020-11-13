'use strict'

const models = require('../db/models')
const services = require('../services')
const auth = require('../middlewares/auth')



const register = async (req, res, next) => {
    try {
        let reqBody = req.body;
        const getHash = await services.user.generateHash({ password: reqBody.password })
        reqBody.password = getHash.password;
        const data = await models.User.create(reqBody)
        if (data) {
            res.body = {
                data: {},
                message: "REG_SUCCESS"
            }
            next()
        } else {
            throw new Error('SOMETHING_WORNG')
        }

    } catch (e) {
        next({ err: e })
    }
};
const login = async (req, res, next) => {
    try {
        req.body.status = "active"
        let reqBody = req.body;
        const data = await models.User.read({ email: reqBody.email, status: "active" })
        if (data) {
            const isValidHash = await services.user.validatePwdHash({
                password: reqBody.password,
                passwordHash: data.password
            })
            if (isValidHash) {
                delete data.password
                let token = await auth.generateToken({
                    userType: data.userType,
                    email: data.email,
                    status: data.status,
                    userId: data._id,
                })
                data.accessToken=token
                if (token) {
                    res.body = {
                        data: data,
                        message: "SUCCESS"
                    }
                    next()
                } else {
                    throw new Error('SOMETHING_WORNG')
                }

            } else {
                throw new Error('SOMETHING_WORNG')
            }
        } else {
            next({ err: 'USER_NOT_FOUND' })
        }
    } catch (e) {
        next({ err: e })
    }
};


module.exports = {
    register,
    login
}