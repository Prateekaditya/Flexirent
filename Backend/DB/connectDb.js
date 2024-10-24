const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();
const MongoDbUrl= process.env.DB

async function connectDB(){
    try{
        await mongoose.connect(MongoDbUrl)
        console.log("Connect to Database")
    }
    catch(e){
        console.log(e)
    }
}

module.exports = connectDB;