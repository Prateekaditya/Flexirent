const productModel = require('../models/product.model')
const userModel = require('../models/user.model')
const upload = require('../config/multer')
const fs = require('fs')

const createProduct = async(req,res) =>{
    try{
        const imageName =req.file.filename
        const {name, description, category, price, duration, stock}= req.body;
        const seller = await userModel.findById(req.user._id)
        if(seller.role!=="seller"){
            return res.status(400).json({
                success:false,
                message:"You are not a Seller imposter!!!!!"
            })
        }
        const product = await productModel.create({
            creator:req.user._id,
            name,
            description,
            category,
            price,
            duration,
            stock,
            images:imageName
        })
        await product.save();
        return res.status(200).json({
            message:"Product Created",
            success:true
        })
    }
    catch(e){
        return res.status(500).json({
            error:`${e.message}`
        })
    }
}

const getProducts = async(req,res) =>{
    try{
        const user = req.body;
        if (!user) {
            return res.status(400).send({ error: 'unable to find required details' })
        }
        const products = await productModel.find().populate('creator','name email').populate('reviews.user','name email')
        
        if(!products){
            return res.status(400).json({
                message:"No products could be get",
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            message:"Done creation",
            count:products.length,
            data:products
        })
    }
    catch(e){
        return res.status(500).json({
            error:`${e.message}`
        })
    }
}
const getSellerProduct = async (req,res) =>{
    try{
        const products = await productModel.find({creator:req.user._id}).populate('reviews.user' ,'name email')
        if(!products){
            return res.status(400).json({
                success:false,
                message:"Not a seller"
            })
        }
        return res.status(200).json({
            success:true,
            message:"They are the products",
            count:products.length,
            data:products
        })

    }
    catch(e){
        return res.status(500).json({
            error:`${e.message}`
        })
    }
}
const addReview = async(req,res)=>{
    try{
        const {id}=req.params;
        const { rating ,comment}= req.body
        const product = await productModel.findById(id).populate('reviews.user','name email')
        if(!product){
            return res.status(400).json({
                success:false,
                message:"Product does not exist"
            })
        }
        const alreadyReviewed = product.reviews.find( (review)=>{
            review.user._id.toString() === req.user.id;
            
        })
        
        if(alreadyReviewed){
            return res.status(400).json({
                success:false,
                message:"Product already review"
            })
        }
        const review ={
            user:req.user.id,
            rating,
            comment,
            productId:product._id
        }
        product.reviews.push(review);
        // product.reviews.pop();
        
        await product.save();

        return res.status(200).json({
            success:true,
            message:"Review added",
            count:product.reviews.length,
            data:product
        })
    }
    catch(e){
        return res.status(500).json({
            error:`${e.message}`
        })
    }
}
const editProduct = async(req,res) =>{
    try{
        const {id}=req.params
        const {name, description, category, price, duration, stock}=req.body
        // console.log(req.file.filename)
        const product = await productModel.findById(id)
        const seller = await userModel.findById(req.user._id)
        if(seller.role!=="seller"){
            return res.status(400).json({
                success:false,
                message:"You are not a Seller imposter!!!!!"
            })
        }
        if(product.creator.toString()!==seller._id.toString()){
            // console.log(seller._id)
            return res.status(400).json({
                success:false,
                message:"You are not allowed to edit this product "
            })
        }
        const updateImage = req.file? req.file.filename : product.images;
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            {
              name,
              description,
              category,
              price,
              duration,
              stock,
              images: updateImage
            },
            {
              new: true,
              runValidators: true
            }
          );
          return res.status(200).json({
            success:true,
            data:updatedProduct
          })
    
    }
    catch(e){
        return res.status(500).json({
            error:`${e.message}`
        })
        
    }
}
const deleteProduct = async(req,res)=>{
    try{
        const {id} = req.params
        const product = await productModel.findById(id)
        if(!product){
            return res.status(400).json({
                success:false,
                message:"Product does not exist"
            })
        }
        const seller = await userModel.findById(req.user._id)
        if(seller.role!=="seller"){
            return res.status(400).json({
                success:false,
                message:"You are not a Seller imposter!!!!!"
            })
        }
        if(product.creator.toString()!==seller._id.toString()){
            // console.log(seller._id)
            return res.status(400).json({
                success:false,
                message:"You are not allowed to delete this product "
            })
        
        }
        await product.deleteOne()
        return res.status(200).json({
            success:true,
            message:"Deleted ",
            data:product
        })
    }
    catch(e){
        return res.status(500).json({
            error:`${e.message}`
        })
        
    }
}
const singleProduct = async(req,res)=>{
    try{
        const {id}=req.params
        const product = await productModel.findById(id).populate('creator','name email').populate('reviews.user','name email')

        if(!product){
            return res.status(400).json({
                success:false,
                message:"Could not get the product"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Your data",
            data:product
        })
    }
    catch(e){
        return res.status(500).json({
            error:`${e.message}`
        })
        
    }
}
module.exports ={
    createProduct,
    getProducts,
    getSellerProduct,
    addReview,
    editProduct,
    deleteProduct,
    singleProduct
}