'use strict'
const responseHandler = require('../middlewares/responseHandler');
const userRoute = require('./user.route');

module.exports = app => {
app.use('/api/v1/user', userRoute, responseHandler);

 /**
   * Always keep this route at last
   */
  app.use('*', function (req, res, next) {
    console.log("NO MATCH")
    next({
      err: 'NO_API_FOUND'
    });
  });
  return app;
}
    