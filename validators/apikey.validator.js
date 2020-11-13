'use strict';
const models = require('../db/models');

/**
 * function to validate the api key of all apis
 * @param {*} req x-api-key
 * @param {*} res {}
 * @param {*} next 
 */
const validateApiKey = (req, res, next) => {
  if (!req.headers['x-api-key']) {
    next({
      err: "UNAUTHORIZED_API_KEY"
    });
  } else {
    models.validateApiKey.re({
      "application": "apikey"
    })
      .then(doc => {
        if (!doc) {
          next({
            err: "APP_NOT_REGISTERED"
          })
        } else if (req.headers['x-api-key'] === doc.key) {
          next();
        } else {
          next({
            err: "UNAUTHORIZED_API_KEY"
          });
        }
      })
      .catch(err => {
        next({ err: "TRY_AGAIN" })
      })
  }
};
module.exports = { validateApiKey }