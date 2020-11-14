'use strict';
const mongoose = require('mongoose');

const ProductInvantorySchema = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }, stockIn: {
        type: Number,
        min: 1
    }, stockOut: {
        type: Number,
        min: 1
    },createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },amount:{//amount of one peice of item
        type: Number,
        min: 1
    },totalAmount:{ // total amount of items
        type: Number,
        min: 1
    },status:{
        enum: ['approved', 'pending', 'rejected'],
        type: String,
        default: 'approved'
    }

}, {
        versionKey: false,
        timestamps: true
    });

module.exports = mongoose.model('ProductInventory', ProductInvantorySchema);
