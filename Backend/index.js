const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./DB/connectDb');
const cors= require('cors')
const userRoute = require('./routes/user.route')
const productRoute = require('./routes/product.route')
const cartRoute = require('./routes/cart.route')
const paymentRoute =require('./routes/payment.route')
const orderRoute = require('./routes/order.route.js')

const app  =express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());
app.use(express.static('config'))
app.get('/',(req,res)=>{
    console.log("Get Request on / Route");
    return res.status(200).json({
        messsage:"All good"
    })
})
app.use(
    cors({
        origin: '*',
        credentials: true
    })
)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/users',userRoute)
app.use('/products',productRoute)
app.use('/cart',cartRoute)
app.use('/payment',paymentRoute)
app.use('/order',orderRoute)
app.listen(PORT,()=>{
    console.log(`Server has started at ${PORT} PORT`);
})