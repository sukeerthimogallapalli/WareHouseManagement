'use strict';
const mongoose = require('mongoose');

const WarehouseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },status: {
        enum: ['active', 'inactive', 'blocked'],
        type: String,
        default: 'active'
    }

}, {
        versionKey: false,
        timestamps: true
    });

module.exports = mongoose.model('Warehouse', WarehouseSchema);
