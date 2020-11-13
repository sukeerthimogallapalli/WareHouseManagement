
'use strict'

var jwt = require('jsonwebtoken');
const jwtBlacklist = require('jwt-blacklist')//(jwt);


const generateToken = (config) => new Promise((resolve, reject) => {

    jwt.sign({
        data: config
    }, /* privateKey, */ { algorithm: process.env.JWT_ALGORITHM,expiresIn: '2920h' }, (err, token) => {
        if (err) {
            reject({ err: "TRY_AGAIN" });
        } else {
            resolve(token)
        }

    })

})
const blackListToken = (req, res, next) => {

    jwtBlacklist.blacklist(req.headers['x-access-token'])
    
    res.body = {
        message: "LOGOUT_SUCCESS",
        body: {}
    }
    next();
}
const checkHeaderAccessToken = (req, res, next) => {
    if (!req.headers['x-access-token']) {
        next({ err: "UNAUTHORIZED_TOKEN" });
    } else {
        let accessToken = req.headers['x-access-token'];
        jwt.verify(accessToken, (err, decoded) => {
            if (err) {
                next({ err: "UNAUTHORIZED_TOKEN" });
            } else if ((req.originalUrl.indexOf('student') > 0 && decoded.data.role.toLowerCase() === 'student' && req.originalUrl.split('/').includes('student'))
                || (req.originalUrl.indexOf('merchant') > 0 && decoded.data.role.toLowerCase() === 'merchant' && req.originalUrl.split('/').includes('merchant')) 
                || (req.originalUrl.indexOf('admin') > 0 && (decoded.data.role.toLowerCase() === 'admin'||decoded.data.role.toLowerCase() === 'student_admin'||decoded.data.role.toLowerCase() === 'merchant_admin') && req.originalUrl.split('/').includes('admin')) || 
                (req.originalUrl.indexOf('common') > 0) || (req.originalUrl.indexOf('notification') > 0)) {
                req.User = decoded.data;
                next();
            } else {
                next({ err: "UNAUTHORIZED_TOKEN" });
            }

        })
    }
}

module.exports = {
    generateToken,
    checkHeaderAccessToken,
    blackListToken
}