'use strict'

const models = require('../db/models')



const register = async (req, res, next) => {
    try {
        let reqBody = req.body;
       const data= await models.User.create(reqBody)
        res.body={
            data:{},
            message:"REG_SUCCESS"
        }
        next()
    } catch (e) {
        console.log(e)
        next({ err: e })
    }
};


module.exports = {
    register
}