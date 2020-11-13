"use strict";

var module;
module.exports.errors = {
    UNAUTHORIZED_API_KEY: {
        message: "Unauthorized API key",
        code: 403
    }, APP_NOT_REGISTERED: {
        message: "Application apikey is not registered",
        code: 403
    },
    CUSTOM_MESSAGE: {
        message: "Please include a message for this response",
        code: 404
    },
    SOMETHING_WORNG: {
        message: 'Something went wrong,Please try after some time',
        code: 403
    },EMAIL_EXIST_ALREADY:{
        message:'Email you entered is already exsits',
        code:200
    }

}

module.exports.success = {
    SUCCESS: {
        message: "success",
        code: 200
    },
    REG_SUCCESS: {
        message: "Registration is successful",
        code: 200
    }

}