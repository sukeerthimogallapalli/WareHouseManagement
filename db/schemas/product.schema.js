'use strict';
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },wareHouseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Warehouse',
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

module.exports = mongoose.model('Product', ProductSchema);
