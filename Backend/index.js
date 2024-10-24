const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./DB/connectDb');
const userRoute = require('./routes/user.route')
const app  =express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());

app.get('/',(req,res)=>{
    console.log("Get Request on / Route");
    return res.status(200).json({
        messsage:"All good"
    })
})
app.use('/users',userRoute)

app.listen(PORT,()=>{
    console.log(`Server has started at ${PORT} PORT`);
})