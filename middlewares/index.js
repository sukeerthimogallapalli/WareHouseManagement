'use strict';

var bodyParser = require('body-parser'),
  mo = require('method-override'),
  cors = require('cors'),
  expressSanitizer = require('express-sanitizer');


var mw = {};
mw.prettyConsole = require('./prettyConsole');
// mw.responseBuilder = require('./responseBuilder');
//eval(autoFileLoader('mw'));


module.exports = function (app) {
  app.use(mw.prettyConsole)
    // .use(mw.responseBuilder)
    .use(cors())
    .use(bodyParser.json({ limit: 50000000, extended: true }))
    .use(bodyParser.urlencoded({
      limit: '50mb',
      extended: true
    }))
    .use(expressSanitizer())
    .use(mo())
  console.log('Middlewares Connected')
  return app;
};
