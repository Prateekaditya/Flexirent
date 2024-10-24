const userModel = require('../models/user.model')
const validators = require('../utils/validators')
const bcyrpt = require('bcryptjs');
const helper = require('../utils/helper')
const register = async (req,res)=>{
    try{
        const { name ,email,pass,cpass,role}=req.body
        if(!name || !email || !pass || !cpass  || !role){
            res.status(400).json({
                message:"All fields are required"
            })
        }
        if (pass !== cpass){
            res.status(400).json({
                message:"Password doesn't match"
            })
        }
        if(!validators.checkEmail(email)){
            return res.status(400).json({
                message:"Invalid Email"
            })
        }
        if(!validators.checkPass(pass)){
            return res.status(400).json({
                message:"Password should be of 10 characters hav must have a number"
            })
        }
        const user  = await userModel.findOne({email})
        if(user){
            return res.status(400).json({
                message:"User already exist"
            })
        }
        const hashpass = await bcyrpt.hash(pass,10)
        const newUser = new userModel({
            name,
            email,
            password:hashpass,
            role
        })
        await newUser.save();
        return res.status(200).json({
            message:"User Created",
            user:{
                name:newUser.name,
                email:newUser.email,
                role:newUser.role
            }
        })
    }
    catch(e){
        res.status(500).json({
            error:`${e.message}`,
        })
    }
} 

const login = async(req,res)=>{
    try{
        const { email,pass,role}=req.body;
        if(!email|| !pass || !role){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Invalid Credentials"
            })
        }
        const isMatch = await bcyrpt.compare(pass,user.password)
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid Credentials"
            })
        }
        const isRole = await userModel.findOne({role})
        if(!isRole){
            return res.status(400).json({
                message:"Invalid Credentials"
            })
        }
        const token = helper.createJwt(user.email)
        res.status(200).json({ message: 'login success', token, user: { name: user.name, email: user.email,role:user.role } })
    }
    catch(e){
        return res.status(500).json({
            error:`${e.message}`
        })
    }
}


module.exports ={
    register,
    login,
}