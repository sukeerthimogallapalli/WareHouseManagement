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
 * @param {*} res {
                    "data": {},
                    "success": true,
                    "message": "Registration is successful",
                    "status": 200
                  }

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

      const value = await registerSchema.validateAsync(reqBody);

        const isEmailExist = await models.User.read({ email: reqBody.email })
        if (isEmailExist) {
          next({ err: 'EMAIL_EXISTS_ALREADY' })
        } else {
          next()
        }

      
    } catch (err) {
      next({ err: err })
    }
  }
}
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
const validateLogin = async (req, res, next) => {
  let reqBody = req.body;
  const pwd = CryptoJS.AES.decrypt(reqBody.password, process.env.CRYPTO_SECRET);
  const originalPwd = pwd.toString(CryptoJS.enc.Utf8);
  reqBody.password = originalPwd;
  let loginSchema = joi.object({
    email: joi.string().regex(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/).required().error(new Error('INVALID_EMAIL')),
    password: joi.string().min(7).required()
  });

  try {
    const value = await loginSchema.validateAsync(reqBody);
    next()
  } catch (err) {
    next({ err: err })
  }
}
module.exports = {
  validateRegistration,
  validateLogin
}