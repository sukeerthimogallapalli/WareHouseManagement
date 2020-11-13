'use strict';
const joi = require('joi');
const CryptoJS = require("crypto-js");

/**
 * function to validate registration data 
 * @param {*} req {
 *                  "firstName":"",
 *                  "lastName":"",
 *                  "email":"",
 *                  "gender":"",
 *                  "password":"",
 *                  "confirmPassword":"",
 *                 }
 * @param {*} res 
 * @param {*} next 
 */

const validateRegistration = (req, res, next) => {
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
    const registerSchema = {
      firstName: joi.string().max(32).required(),
      lastName: joi.string().max(32).required(),
      email: joi.string().regex(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/).required().error(new Error('INVALID_EMAIL')),
      gender: joi.string().lowercase().valid(['female', 'male', 'other']).required(),
      password: joi.string().min(7).required().strict(),
      confirmPassword: joi.string().valid(joi.ref('password')).required().strict()
    };
    joi.validate(reqBody, registerSchema, (err, validated) => {
      if (err) {
        next(err);
      } else {
        next()
      }
    })


  }
}


module.exports = {
  validateRegistration
}