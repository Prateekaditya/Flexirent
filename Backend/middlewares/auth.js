const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ success: false, message: 'No authorization header' });
        }
        
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Invalid authorization header' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        // console.log(decoded)
        // console.log({ email: decoded.userId })
        const user = await User.findOne({ email: decoded.userId });
        // console.log(user)
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (e) {
        return res.status(401).json({ 
            success: false,
            message: 'Authentication failed',
            error: e.message 
        });
    }
};

const isSeller = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        if (req.user.role !== 'seller') {
            return res.status(403).json({
                success: false,
                message: "Access denied! Sellers only"
            });
        }
        next();
    } catch (e) {
        return res.status(500).json({
            success: false,
            error: e.message
        });
    }
};

module.exports = { protect, isSeller };