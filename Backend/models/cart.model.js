const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Changed to 'User' to match actual vendor references
        required: true // Set to false if vendorId might be null or undefined
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ]
});

const cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel;
