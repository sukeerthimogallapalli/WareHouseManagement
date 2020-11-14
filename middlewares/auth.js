
'use strict'

var jwt = require('jsonwebtoken');
const jwtBlacklist = require('jwt-blacklist')//(jwt);


const generateToken = (config) => new Promise((resolve, reject) => {

    jwt.sign({
        data: config,exp: Math.floor(Date.now() / 1000) + (60 * 60),
    }, /* privateKey, */ process.env.JWT_SECRET, (err, token) => {
        if (err) {
            reject({ err: "TRY_AGAIN" });
        } else {
            console.log(token)
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
        jwt.verify(accessToken,process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                next({ err: "UNAUTHORIZED_TOKEN" });
            } else if ((req.originalUrl.indexOf('user') > 0 && decoded.data.userType.toLowerCase() === 'customer' )) {
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