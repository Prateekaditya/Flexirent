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
    
        // .lean()
        ;
        console.log(orders);
        // console.log(JSON.stringify(orders, null, 2))
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

module.exports ={
    getOrderUser
}