'use strict';
const joi = require('joi');
const CryptoJS = require("crypto-js");
const models = require('../db/models')
// var ciphertext = CryptoJS.AES.encrypt("123123123", process.env.CRYPTO_SECRET).toString();
// console.log(ciphertext, 'U2FsdGVkX1/KYM9Zaz/5s7XAuJyWc/SRyKLsJCsQAnk=')
// var decrypt=CryptoJS.AES.decrypt("U2FsdGVkX1+VCdPJkcu0RjiLBs1yhZ5xr1yZpZ53pcI=", process.env.CRYPTO_SECRET)
// console.log(decrypt.toString(CryptoJS.enc.Utf8))

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
 * @param {*} res 
 * @param {*} next 
 */

const validateRegistration = async (req, res, next) => {
  let reqBody = req.body;
  if (!reqBody.password || !reqBody.confirmPassword) {
    next({ err: "PWD_CPWD_REQ" })
  } else {

    const pwd = CryptoJS.AES.decrypt(reqBody.password, process.env.CRYPTO_SECRET);
    const cpwd = CryptoJS.AES.decrypt(reqBody.confirmPassword, process.env.CRYPTO_SECRET);
    const originalPwd = pwd.toString(CryptoJS.enc.Utf8);
    const originalCpwd = cpwd.toString(CryptoJS.enc.Utf8);
    reqBody.password = originalPwd;
    reqBody.confirmPassword = originalCpwd;
    let registerSchema = joi.object({
      firstName: joi.string().max(32).required(),
      lastName: joi.string().max(32).required(),
      email: joi.string().regex(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/).required().error(new Error('INVALID_EMAIL')),
      gender: joi.string().lowercase().valid('female', 'male', 'other').required(),
      password: joi.string().min(7).required().strict(),
      confirmPassword: joi.string().valid(joi.ref('password')).required().strict()
    });

    try {

      const value = await registerSchema.validateAsync(req.body);
      if (value) {
        const isEmailExist = await models.User.read({ email: req.body.email })
        if (isEmailExist) {
          next({ err: 'EMAIL_EXIST_ALREADY' })
        } else {
          next()
        }

      } else {

        next({ err: 'Validation Error' })
      }
    } catch (err) {
      next({ err: err })
    }




  }
}


module.exports = {
  validateRegistration
}