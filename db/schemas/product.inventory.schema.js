'use strict';
const mongoose = require('mongoose');

const ProductInvantorySchema = new mongoose.Schema({
    warehouseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }, quantity: {
        type: Number,
        min: 1,required:true
    }, type: {
        type: String,
        enum: ['STOCK_IN', 'STOCK_OUT'],
        default: ['STOCK_IN']
    }, createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
  /*   price: {
        type: Number,
        min: 1
    }, totalAmount: { 
        type: Number,
        min: 1
    }, */ status: {
        enum: ['approved', 'pending', 'rejected', 'blocked'],
        type: String,
        default: 'approved'
    }, blockedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
        versionKey: false,
        timestamps: true
    });

module.exports = mongoose.model('ProductInventory', ProductInvantorySchema);
