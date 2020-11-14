'use strict';
const mongoose = require('mongoose');

const WarehouseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    }, status: {
        enum: ['active', 'inactive', 'blocked'],
        type: String,
        default: 'active'
    }, createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, blockedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
        versionKey: false,
        timestamps: true
    });

module.exports = mongoose.model('Warehouse', WarehouseSchema);
