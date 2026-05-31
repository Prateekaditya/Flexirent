const Payment = require('../models/payment.model.js');

// Customer: get all own orders
const getOrderUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Payment.find({ userId })
            .populate({ path: 'vendorPayments.vendorId', select: 'name' })
            .populate({ path: 'vendorPayments.items.productId', select: 'name price images' })
            .sort({ createdAt: -1 });
        return res.status(200).json({ success: true, orders });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

// Seller: get all orders that contain their products
const getOrderSeller = async (req, res) => {
    try {
        const vendorId = req.user.id;
        const orders = await Payment.find({ 'vendorPayments.vendorId': vendorId })
            .populate('userId', 'name email')
            .populate('vendorPayments.items.productId', 'name price images duration')
            .sort({ createdAt: -1 });
        return res.status(200).json({ success: true, orders });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

// Anyone (customer/seller): get a single order by orderId
const getSingleOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Payment.findOne({ orderId })
            .populate('userId', 'name email')
            .populate({ path: 'vendorPayments.vendorId', select: 'name email' })
            .populate({ path: 'vendorPayments.items.productId', select: 'name price images duration' });

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Only the buyer or a seller who owns part of the order can view it
        const userId = req.user.id;
        const isBuyer = order.userId._id.toString() === userId;
        const isVendor = order.vendorPayments.some(vp => vp.vendorId._id.toString() === userId);

        if (!isBuyer && !isVendor) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        return res.status(200).json({ success: true, order });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

// Seller: update the status of their own vendor-payment inside an order
// Valid transitions: pending -> accepted -> On the way -> delivered  |  any -> cancel
const VALID_STATUSES = ['pending', 'accepted', 'On the way', 'delivered', 'cancel'];

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const vendorId = req.user.id;

        if (!VALID_STATUSES.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`
            });
        }

        const order = await Payment.findOne({ orderId });
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        if (order.status !== 'completed') {
            return res.status(400).json({ success: false, message: 'Cannot update status of an unpaid order' });
        }

        const vendorPayment = order.vendorPayments.find(
            vp => vp.vendorId.toString() === vendorId
        );

        if (!vendorPayment) {
            return res.status(403).json({ success: false, message: 'You have no items in this order' });
        }

        vendorPayment.status = status;
        await order.save();

        return res.status(200).json({ success: true, message: 'Order status updated', order });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

// Customer: cancel their own order (only if not yet dispatched)
const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id;

        const order = await Payment.findOne({ orderId });
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        if (order.userId.toString() !== userId) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        // Prevent cancellation if any vendor has already dispatched the order
        const nonCancellable = order.vendorPayments.some(
            vp => ['On the way', 'delivered'].includes(vp.status)
        );
        if (nonCancellable) {
            return res.status(400).json({
                success: false,
                message: 'Cannot cancel: one or more items are already dispatched or delivered'
            });
        }

        // Mark all vendor payments as cancelled and the overall order as failed
        order.vendorPayments.forEach(vp => { vp.status = 'cancel'; });
        order.status = 'failed';
        await order.save();

        return res.status(200).json({ success: true, message: 'Order cancelled successfully', order });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

module.exports = {
    getOrderUser,
    getOrderSeller,
    getSingleOrder,
    updateOrderStatus,
    cancelOrder
};