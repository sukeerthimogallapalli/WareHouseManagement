'use strict'
const bcrypt = require('bcrypt');


const generateHash = (data) => new Promise((resolve, reject) => {
    bcrypt.hash(data.password, Number(process.env.BCRYPT_SALT_ROUNDS)).then(function (hash) {
        data.password = hash
    }).then(info => {
        resolve(data)
    }).catch(reject)
})
const validatePwdHash = (data) => new Promise((resolve, reject) => {
    bcrypt.compare(data.password, data.passwordHash).then(info=>{
        if(info){
            resolve(info)
        }else{
            reject('INCORRECT_PWD')
        }
       
    }).catch(reject)
})
module.exports = {
    generateHash,
    validatePwdHash
}