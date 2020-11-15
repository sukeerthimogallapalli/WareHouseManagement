'use strict';
const mongoose = require('mongoose');

const BlacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique:true
    },
    createdBy: {
        type: String,
        required: true
    }

}, {
        versionKey: false,
        timestamps: true
    });

module.exports = mongoose.model('BlacklistToken', BlacklistTokenSchema);
