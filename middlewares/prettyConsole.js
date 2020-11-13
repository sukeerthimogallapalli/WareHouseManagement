'use strict'

const config = global.config;

module.exports = function(req, res, next) {
  req._startTime = new Date();

  res.on('finish', function() {
    if (!config.server.prettyConsole.isEnabled) return;
    var time = '[' + new Date() + '] :',
      method = req.originalMethod,
      url = req.originalUrl,
      type = (req.headers['content-type'] || ''),
      statusCode = res.statusCode,
      totalTime = (new Date() - new Date(req._startTime)) + ' ms';

    console.log('\x1b[33m%s\x1b[0m ', time, '\x1b[0m');
    console.log('\n--------------- start ----------\n');
    console.log(' response to : ', '\x1b[37m', method, '\x1b[32m', url, '\x1b[31m', type, '\x1b[36m', statusCode, '\x1b[32m', totalTime, '\x1b[0m');
    console.log(' req.body : \n \x1b[2m', JSON.stringify(req.body, null, 2), '\x1b[0m');
    console.log(' req.query : \n \x1b[2m', JSON.stringify(req.query, null, 2), '\x1b[0m');
    console.log(' req.headers : \n \x1b[2m', JSON.stringify(req.headers, null, 2), '\x1b[0m');
    console.log(' response : \n \x1b[2m', res.body, '\x1b[0m');

    console.log('\n---------------- end -----------\n')
    delete res.outcome;
  });
  return next();
};