'use strict'

const models = require('../db/models')
const services = require('../services')
const auth = require('../middlewares/auth')

/**
 * function to validate registration data 
 * @param {*} req {
 *                  "firstName":"",
 *                  "lastName":"",
 *                  "email":"",
 *                  "gender":"",
 *                  "password":"",
 *                  "confirmPassword":""
 *                 }
 * @param {*} res {
                    "data": {},
                    "success": true,
                    "message": "Registration is successful",
                    "status": 200
                  }

 * @param {*} next 
 */


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
/**
 * function to validate login data 
 * @param {*} req {
 *                  "email":"",
 *                  "password":"",
 *                 }
 * @param {*} res {
                    "data": {
                        "_id": "5fae3c3d9fc560bdad11e2a6",
                        "userType": "CUSTOMER",
                        "status": "active",
                        "firstName": "sukeerthi",
                        "lastName": "M",
                        "email": "msukeerthi1@gmail.com",
                        "gender": "female",
                        "createdAt": "2020-11-13T07:56:45.911Z",
                        "updatedAt": "2020-11-13T07:56:45.911Z",
                        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJUeXBlIjoiQ1VTVE9NRVIiLCJlbWFpbCI6Im1zdWtlZXJ0aGkxQGdtYWlsLmNvbSIsInN0YXR1cyI6ImFjdGl2ZSIsInVzZXJJZCI6IjVmYWUzYzNkOWZjNTYwYmRhZDExZTJhNiJ9LCJpYXQiOjE2MDUyNTU2MzV9.6WYTe7WjBWvKKWt9yIPUspO-rlO-XQizCr4hyAysFao"
                    },
                    "success": true,
                    "message": "success",
                    "status": 200
                }
 * @param {*} next 
 */
const login = async (req, res, next) => {
    try {
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
                data.accessToken = token
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
const logout = async (req, res, next) => {
    console.log(req.User)
    return models.BlacklistToken.create({ token: req.headers['x-access-token'], createdBy: req.User.email }).then(info => {
       if(info){
        res.body = {
            message: "LOGOUT_SUCCESS"
        }
        next()
       }else{
           throw new Error('SOMETHING_WORNG')
       }
       
    }).catch(next)

}

module.exports = {
    register,
    login,
    logout
}