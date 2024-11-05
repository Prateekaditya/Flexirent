const userModel = require('../models/user.model');
const validators = require('../utils/validators');
const bcrypt = require('bcryptjs');
const { createJwt } = require('../utils/helper.js');

const register = async (req, res) => {
    try {
        const { name, email, pass, cpass, role } = req.body;
        
        // Input validation
        if (!name || !email || !pass || !cpass || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (pass !== cpass) {
            return res.status(400).json({
                success: false,
                message: "Passwords don't match"
            });
        }

        if (!validators.checkEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email"
            });
        }

        if (!validators.checkPass(pass)) {
            return res.status(400).json({
                success: false,
                message: "Password should be 10 characters and must have a number"
            });
        }

        // Check if user exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Create new user
        const hashpass = await bcrypt.hash(pass, 10);
        const newUser = new userModel({
            name,
            email,
            password: hashpass,
            role
        });

        await newUser.save();
        
        // Generate token
        // const token = createJwt(newUser.email);

        return res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            error: e.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, pass, role } = req.body;
        
        if (!email || !pass || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await userModel.findOne({ email, role });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = createJwt(user.email);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            error: e.message
        });
    }
};

const addAddandPhone = async (req, res) => {
    try {
        const { country, city, state, address1, address2, pincode, addressType, phoneNumber } = req.body;
        
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const user = await userModel.findById(req.user._id);
        // console.log(req.user._id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        

        user.address.push({
            country,
            city,
            state,
            address1,
            address2,
            pincode,
            addressType
        });

        user.phoneNumber = phoneNumber;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Address and phone number added successfully",
            address: user.address,
            phoneNumber: user.phoneNumber
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            error: e.message
        });
    }
};

const getProfile = async(req,res) =>{
    try{
        const {id} = req.params
        const user = await userModel.findById(id);
        return res.status(200).json({
            success:true,
            user
        })
    }
    catch(e){
        return res.status(500).json({
            error:`${e.message}`
        })
    }
}



module.exports = {
    register,
    login,
    addAddandPhone,
    getProfile
};