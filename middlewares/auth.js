
'use strict'

var jwt = require('jsonwebtoken');
var models = require('../db/models');

const { createBlackList } = require('jwt-blacklist');
// var blacklist = require('express-jwt-blacklist');

const generateToken = (config) => new Promise((resolve, reject) => {

    jwt.sign({
        data: config, exp: Math.floor(Date.now() / 1000) + (60 * 60),
    }, /* privateKey, */ process.env.JWT_SECRET, (err, token) => {
        if (err) {
            reject({ err: "TRY_AGAIN" });
        } else {
            console.log(token)
            resolve(token)
        }

    })

})

// const blackListToken = async (req, res, next) => {
//     const blacklist = await createBlackList({})
//     const addB = await blacklist.add(req.headers['x-access-token'])
//     const blacklistHas = await blacklist.has(req.headers['x-access-token']);
//     console.log(addB, blacklistHas)

//     res.body = {
//         message: "LOGOUT_SUCCESS",
//         body: {}
//     }
//     next();
// }
const checkHeaderAccessToken = async (req, res, next) => {
    if (!req.headers['x-access-token']) {
        next({ err: "UNAUTHORIZED_TOKEN" });
    } else {
        let accessToken = req.headers['x-access-token'];
        blackListHas(req.headers['x-access-token']).then(info => {
            jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    next({ err: "UNAUTHORIZED_TOKEN" });
                } else if ((req.originalUrl.indexOf('user') > 0 && decoded.data.userType.toLowerCase() === 'customer')) {
                    req.User = decoded.data;
                    next();
                } else {
                    next({ err: "UNAUTHORIZED_TOKEN" });
                }

            })
        }).catch(next)
    }
}
const blackListHas = (data) => new Promise(async (resolve, reject) => {

    // const blacklist = await createBlackList({})
    // const blacklistHas = await blacklist.has(data.token);
    // console.log(blacklistHas, 'blacklistHas')
    // if (blacklistHas) {
    //     reject({ err: "UNAUTHORIZED_TOKEN" });
    // } else {
    //     resolve()
    // }
    models.BlacklistToken.read({ token: data }).then(info => {
        if (!info) {
            resolve()
        } else {
            reject({ err: "UNAUTHORIZED_TOKEN" })

        }
    }).catch(reject)

})
module.exports = {
    generateToken,
    checkHeaderAccessToken
    // blackListToken
}