'use strict';
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },warehouseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Warehouse',
        required: true
    },status: {
        enum: ['active', 'inactive', 'blocked'],
        type: String,
        default: 'active'
    },price:{
        type: Number,
        required: true,
        min:1
    },quantity:{
        type: Number,
        required: true,
        default:0
    }

}, {
        versionKey: false,
        timestamps: true
    });

module.exports = mongoose.model('Product', ProductSchema);
