'use strict';
const mongoose = require('mongoose');
var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        index: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String
    },userType: {
        enum: ['ADMIN', 'CUSTOMER'],
        type: String,
        default: 'CUSTOMER'
    },
    password: {
        type: String,
        required:true
    },status:{
        enum: ['active', 'pending', 'blocked'],
        type: String,
        default: 'active'
    }

}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
