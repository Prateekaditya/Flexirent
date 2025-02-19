const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/payment.model');
const Cart = require('../models/cart.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const dotenv = require('dotenv');

dotenv.config();
if (!process.env.RAZOR_KEY_ID || !process.env.RAZOR_KEY_SECRET) {
    console.error('ERROR: Razorpay credentials are missing in environment variables!');
    process.exit(1); // Stop the server if credentials are missing
}

const razorpay = new Razorpay({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_KEY_SECRET
});
// const Payment = require('../models/payment.model'); // Ensure correct import

const getOrderById = async (req, res) => {
    try {
        console.log("Fetching order details for ID:", req.params.orderId);
        
        const order = await Payment.findOne({ orderId: req.params.orderId }).populate('userId vendorPayments.vendorId vendorPayments.items.productId');
        
        if (!order) {
            console.log("Order not found");
            return res.status(404).json({ error: "Order not found" });
        }

        console.log("Order fetched:", order);
        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ error: "Error fetching order details" });
    }
};

const createOrder = async (req, res) => {
    try {
        const { userId, selectedAddress } = req.body; // Accept selected address

        if (!userId || !selectedAddress) {
            return res.status(400).json({ error: "UserId and Address are required" });
        }

        // Fetch user details with addresses
        const user = await User.findById(userId).populate('address');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        console.log("User found:", user);
console.log("User addresses:", user.address);


        // Check if the selected address exists for the user
        const addressExists = user.address.some(addr => addr._id.toString() === selectedAddress);
        if (!addressExists) {
            return res.status(400).json({ error: "Invalid address selected" });
        }

        // Fetch cart with populated product details
        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: 'name price creator stock',
            populate: { path: 'creator', select: 'name email _id' }
        });

        if (!cart || !cart.items.length) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        let totalAmount = 0;
        const vendorItems = {};
        const platformFee = 50;

        for (const item of cart.items) {
            if (!item.productId || item.productId.stock < item.quantity) {
                return res.status(400).json({ error: `Insufficient stock for ${item.productId?.name}` });
            }

            const vendorId = item.productId.creator._id.toString();
            if (!vendorItems[vendorId]) {
                vendorItems[vendorId] = { vendorId, items: [], subtotal: 0, platformFee, total: 0 };
            }

            vendorItems[vendorId].items.push({
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price
            });

            vendorItems[vendorId].subtotal += item.productId.price * item.quantity;
            vendorItems[vendorId].total = vendorItems[vendorId].subtotal + platformFee;
        }

        totalAmount = Object.values(vendorItems).reduce((sum, v) => sum + v.total, 0);
        const order = await razorpay.orders.create({
            amount: totalAmount * 100,
            currency: "INR",
            receipt: `rcpt_${Date.now().toString().slice(-10)}`,
            notes: { userId, selectedAddress }
        });

        console.log("Cart details:", cart);
console.log("Total amount:", totalAmount);

        // Save order in DB
        const payment = new Payment({
            orderId: order.id,
            razorpayOrderId: order.id,
            userId,
            totalAmount,
            selectedAddress, // Store selected address
            vendorPayments: Object.values(vendorItems).map(vendor => ({
                vendorId: vendor.vendorId,
                amount: vendor.total,
                items: vendor.items
            }))
        });

        await payment.save();

        res.status(200).json({
            orderId: order.id,
            amount: totalAmount,
            key: process.env.RAZOR_KEY_ID,
            vendorBreakdown: Object.values(vendorItems),
            selectedAddress
        });

    } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const payment = await Payment.findOne({
            razorpayOrderId: razorpay_order_id
        });

        if (!payment) {
            return res.status(400).json({ error: "Payment not found" });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZOR_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            // Update payment status
            payment.razorpayPaymentId = razorpay_payment_id;
            payment.razorpaySignature = razorpay_signature;
            payment.status = "completed";
            
            // Update vendor payment statuses
            payment.vendorPayments.forEach(vendor => {
                vendor.status = "pending"; // Will be processed for transfer to vendor
            });

            await payment.save();

            // Update product stock and sold_out count
            const cart = await Cart.findOne({ userId: payment.userId });
            if (cart) {
                for (const item of cart.items) {
                    await Product.findByIdAndUpdate(item.productId, {
                        $inc: {
                            stock: -item.quantity,
                            sold_out: item.quantity
                        }
                    });
                }

                // Clear cart
                await Cart.deleteOne({ userId: payment.userId });

                // Add to user's orders
                await User.findByIdAndUpdate(payment.userId, {
                    $push: {
                        order: {
                            orderId: payment.orderId,
                            amount: payment.totalAmount,
                            status: "completed",
                            createdAt: new Date()
                        }
                    }
                });
            }

            return res.status(200).json({
                message: "Payment successful",
                orderId: payment.orderId
            });
        } else {
            payment.status = "failed";
            await payment.save();
            return res.status(400).json({ error: "Invalid signature" });
        }
    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({ error: "Payment verification failed" });
    }
};

module.exports = { createOrder, verifyPayment,getOrderById };