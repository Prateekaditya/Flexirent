const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:['customer','seller','admin'],
        reuired:true
    },
    phoneNumber:{
        type:Number
    },
    address:[{
        country:{
            type:String
        },
        city:{
            type:String
        },
        state:{
            type:String
        },
        address1:{
            type:String
        },
        address2:{
            type:String
        },
        pincode:{
            type:Number,
        },
        addressType:{
            type:String
        }
    }],
    cart:{
        type:Array,
        default:[]
    },
    order:{
        type:Array,
        default:[]
    }

})

const  userModel = mongoose.model('User',userSchema);

module.exports = userModel;