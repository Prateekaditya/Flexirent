const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:String
    },
    price:{
        type:Number,
        require:true
    },
    duration:{
      type:String,
      require:true
    },
    stock:{
        type:Number,
        require:true
    },
    images:[{
        type:String,
    }],
    reviews: [
        {
          user: {
            type: Object,
          },
          rating: {
            type: Number,
          },
          comment: {
            type: String,
          },
          productId: {
            type: String,
          },
          createdAt: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
      ratings: {
        type: Number,
      },
      shopId: {
        type: String,
        required: true,
      },
      shop: {
        type: Object,
        required: true,
      },
      sold_out: {
        type: Number,
        default: 0,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
})

const productModel = mongoose.model('Product',productSchema);

module.exports = productModel