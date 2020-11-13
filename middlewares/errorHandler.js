'use strict'

var exports;
var langs = require('../langs');
const helper = require('../helper');

module.exports = function (err, req, res, next) {
  req.query.lang = req.query.lang || 'en';
  let message;
  console.log("in handler", err);

  let errorTitle = err.message || err.err;
  if (errorTitle) {
    // message = langs[req.query.lang || 'en-us']['errors'][err.message || err.err || 'CUSTOM_MESSAGE'];
    message = langs[req.query.lang || 'en']['errors'][err.message || err.err] || errorTitle
  } else {
    message = typeof err === 'string' ? err : {};
  }
  try {
    console.log(res.body)
    if (!res.body||!res.body.meta) {
      res.status((message && message.code) || 401).send({
        'err': typeof message === 'string' ? message : (message.message || message.err),
        'success': false,
        'status': (message && message.code) || 401
      });
      
    } else {
      res.status((message && message.code) || (err.code) || 401).send({
        'err': typeof message === 'string' ? helper.common.compileText(message, res.body.meta || {}) : (helper.common.compileText(message.message, res.body.meta || {}) || message.err),
        'success': false,
        'status': (message && message.code) || (err.code) || 401,
        'responseCode': typeof message === 'string' ? `ERR${(message && message.code) || (err.code) || 401}` : message.resCode
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({
      'err': 'Something went wrong. Please try again',
      'success': false,
      'status': 401
    });
  }
} 
