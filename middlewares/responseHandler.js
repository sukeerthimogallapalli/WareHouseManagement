'use strict';
var langs = require('../langs');
const helper = require('../helper');

module.exports = function (req, res, next) {
  req.query.lang = req.query.lang || 'en';
console.log('inside handler',res.body)
  // res.body.errors = res.body.errors || [];
  // if(res.body && (Object.keys(res.body.data).length || Object.keys(res.body.errors).length) )
  if (res.body) {
    let response = {};
    response.data = res.body.data || {};
    response.errors = res.body.errors || [];
    response.success = Object.keys(response.errors).length ? false : true;
    if (response.success) {
      delete response.errors;
    }

    if (res.body.meta) {
     var message = langs[req.query.lang || 'en'][response.success ? 'success' : 'errors'][res.body.message || 'CUSTOM_MESSAGE'];
      response.message = helper.common.compileText(message.message, res.body.meta || {});
      response.status = message.code || 200;
    } else {
      var message = langs[req.query.lang || 'en'][response.success ? 'success' : 'errors'][res.body.message || 'CUSTOM_MESSAGE'];
      // console.log(langs[req.query.lang || 'en-us'][response.success ? 'success' : 'errors']);
      console.log("M", message);
      try {
        response.message = message.message;
        response.status = message.code || 200;
      } catch (err) {
        //TODO: error logging
        response.status = 401;
      }
    }
    res.status(response.status).send(response);
  } else {
    console.log("hereeeeeeeeeeeeeee>>>>>");
    let response = {};
    response.err = "UNAUTHORIZED";
    response.data = {};
    response.code = 401;
    res.status(401).send(response);
  }
}