'use strict'
let models = require('../db/models')

const getProductStock = (data) => new Promise((resolve, reject) => {
    models.ProductInventory.aggregate([
        {
            "$match": data
        },
        {
            "$group": {
                "_id": "$productId",
                "STOCK_IN": {
                    "$sum": {
                        "$cond": [
                            { "$eq": ["$type", "STOCK_IN"] },
                            "$quantity",
                            0
                        ]
                    }
                },
                "STOCK_OUT": {
                    "$sum": {
                        "$cond": [
                            { "$eq": ["$type", "STOCK_OUT"] },
                            "$quntity",
                            0
                        ]
                    }
                },
            }
        },
        {
            "$project": {
                "availableQuantiy": { "$subtract": ["$STOCK_IN", "$STOCK_OUT"] }
            }
        }
    ]).then(info=>{
        resolve(info)
    }).catch(reject)

})

module.exports = {
    getProductStock
}