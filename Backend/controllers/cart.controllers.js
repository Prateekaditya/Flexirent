const Cart = require('../models/cart.model');

const addToCart = async (req, res) => {
    const { userId, productId, vendorId, quantity } = req.body;
    
    try {
        if (!vendorId) {
            return res.status(400).json({ error: "Vendor ID is required" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId, vendorId, quantity }]
            });
        } else {
            const itemIndex = cart.items.findIndex(
                (item) => item.productId.toString() === productId
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, vendorId, quantity });
            }
        }

        await cart.save();
        const populatedCart = await Cart.findOne({ userId })
            .populate('items.productId')
            .populate('items.vendorId', 'name email'); // ✅ Populate vendor details

        return res.status(200).json(populatedCart);
    } catch (error) {
        console.error('Add to cart error:', error);
        return res.status(500).json({
            error: 'Error adding to cart',
            details: error.message
        });
    }
};


// const getCart = async(req, res) => {
//     try {
//         const {userId} = req.params;
//         const cart = await Cart.findOne({userId})
//         .populate({
//             path: 'items.productId',
//             populate: {
//                 path: 'creator', // Populate the creator inside product
//                 select: 'name email' // Select only name and email fields of creator
//             }
//         });
//         // console.log(cart)
            
//         if(!cart) {
//             return res.status(404).json({
//                 message: "Cart not found"
//             });
//         }
        
//         return res.status(200).json(cart);
//     } catch(error) {
//         return res.status(500).json({
//             error: "Error fetching the cart"
//         });
//     }
// };
const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId })
            .populate({
                path: 'items.productId',
                populate: {
                    path: 'creator',
                    select: 'name email'
                }
            })
            .populate('items.vendorId', 'name email'); // ✅ Include vendor details

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({
            error: "Error fetching the cart"
        });
    }
};


const updateCart = async(req, res) => {
    const {userId, productId, quantity} = req.body;
    
    try {
        const cart = await Cart.findOne({userId});
        if(!cart) return res.status(404).json({message: 'Cart not found'});

        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if(itemIndex > -1) {
            if(quantity <= 0) {
                // Remove item if quantity is 0 or negative
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].quantity = quantity;
            }
        } else {
            return res.status(404).json({message: 'Item not found in cart'});
        }

        await cart.save();
        
        // Return populated cart
        const updatedCart = await Cart.findOne({userId})
            .populate('items.productId');
            
        return res.status(200).json({
            message: 'Cart updated',
            cart: updatedCart
        });
    } catch(error) {
        console.error('Update cart error:', error);
        return res.status(500).json({
            error: 'Error updating cart',
            details: error.message
        });
    }
};

const removeItem = async(req, res) => {
    const {userId, productId} = req.body;
    
    try {
        const cart = await Cart.findOne({userId});
        if(!cart) return res.status(404).json({message: 'Cart not found'});

        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if(itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
        } else {
            return res.status(404).json({message: 'Item not found in cart'});
        }

        await cart.save();
        
        const updatedCart = await Cart.findOne({userId})
            .populate('items.productId');
            
        return res.status(200).json({
            message: 'Item removed from cart',
            cart: updatedCart
        });
    } catch(error) {
        return res.status(500).json({
            error: 'Error removing item from cart',
            details: error.message
        });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeItem
};
