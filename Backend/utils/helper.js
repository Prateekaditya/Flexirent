const jwt = require('jsonwebtoken');

const createJwt = (userId) => {
    console.log(userId)
    return jwt.sign({ userId }, process.env.SECRET, { expiresIn: '7d' });
};

const verifyJwt = (token) => {
    return jwt.verify(token, process.env.SECRET);
};

module.exports = { createJwt, verifyJwt };