'use strict';
const express = require('express');
const router = express.Router();

const Auth = require('../middlewares/auth');
const controllers = require('../controllers');
const validator = require('../validators');

router.all('*', validator.ApiKeyValidator.validateApiKey);
router.all('/secure*', Auth.checkHeaderAccessToken);

router.post('/register', validator.UserValidator.validateRegistration, controllers.user.register);



module.exports = router;
