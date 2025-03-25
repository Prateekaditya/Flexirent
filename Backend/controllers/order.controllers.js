const payment = require('../models/payment.model.js')

const getOrderUser = async(req,res)=>{
    try{
        const userId = req.user.id;
        const orders = await payment.find({userId})
        .populate({
            path: 'vendorPayments.vendorId',
            select: 'name'
        })
        .populate({
            path: 'vendorPayments.items.productId',
            select: 'name price images'
        });
        return res.status(200).json({
            success:true,
            orders
        })
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:e.message
        })
    }
}
const getOrderSeller = async(req,res)=>{
    try{
        const vendorId= req.user.id;
        const orders = await payment.find({ "vendorPayments.vendorId": vendorId })
        .populate('userId', 'name email')
        .populate('vendorPayments.items.productId', 'name price images duration');

    res.status(200).json({ success: true, orders });
    }
    catch(e){
        return res.status(500).json({
            message:e.message
        })
    }
}

module.exports ={
    getOrderUser,
    getOrderSeller
}