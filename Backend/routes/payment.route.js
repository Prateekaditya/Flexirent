const express = require('express');
const { createOrder, verifyPayment,getOrderById } = require('../controllers/payment.controllers');
const router = express.Router();
const { protect,isSeller } = require('../middlewares/auth');


router.post('/create-order',protect, createOrder);
router.get('/:orderId',protect, getOrderById);
router.post('/verify-payment',protect, verifyPayment);

module.exports = router;
