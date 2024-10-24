const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

const createJwt =(email) =>{
    const payload={email}
    const token =jwt.sign(payload,process.env.SECRET,{
        expiresIn:'1h',
    })
    return token;
}

module.exports = {createJwt};