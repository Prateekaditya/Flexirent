const express = require('express');
const router = express.Router();
const { protect, isSeller } = require('../middlewares/auth');
const controller = require('../controllers/order.controllers.js');

// Customer: get all their orders
router.get('/', protect, controller.getOrderUser);

// Seller: get all orders containing their products
router.get('/sellerorder', protect, isSeller, controller.getOrderSeller);

// Any authenticated user: get a single order by orderId (access-controlled inside controller)
router.get('/:orderId', protect, controller.getSingleOrder);

// Seller: update the status of their vendor-payment in an order
router.patch('/:orderId/status', protect, isSeller, controller.updateOrderStatus);

// Customer: cancel their own order
router.delete('/:orderId', protect, controller.cancelOrder);

module.exports = router;
