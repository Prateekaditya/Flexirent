const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    items:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            require:true
        },
        price:{
            type:Number,
            require:true
        },
        quantity:{
            type:Number,
            require:true,
            min:1
        }
    }],
    totalAmount:{
        type:Number,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const orderModel = mongoose.Schema('Order',orderSchema)
module.exports = orderModel