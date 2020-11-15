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
    },INCORRECT_PWD:{
        message:'Incorrect Password',
        code:200
    },USER_NOT_FOUND:{
        message:'Requested email is not registered',
        code:200
    },SEND_VALID_DATA:{
        message:'Please send valid data',
        code:200
    },QUAT_LESS_AVAIL:{
        message:'Available quatity is less than the requested quantiy',
        code:200
    },EMAIL_EXISTS_ALREADY:{
        message:'Oops! Looks like you already created account,please try to login',
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
    },WAREHOUSE_SUCC:{
        message:"Yeay! Warehouse created successfully",
        code:200
    },ADD_STOCK_SUCC:{
        message:"Yeay! Stock added successfully",
        code:200
    },ADD_UNSTOCK_SUCC:{
        message:"Yeay! Stock removed successfully",
        code:200
    },LOGOUT_SUCCESS:{
        message:"Logged out successfully",
        code:200
    }

}