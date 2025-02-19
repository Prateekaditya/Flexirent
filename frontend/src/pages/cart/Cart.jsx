import React, { useEffect, useState } from 'react';
import { getCart, updateCart, removeFromCart } from '../../assets/helper.jsx';
import './Cart.css';
import Navbar from '../../components/navbar/Navbar.jsx';
import DeleteCart from '../../components/deletecartbutton/DeleteCart.jsx';
import Checkout from '../../components/checkout/Checkout.jsx';
const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const userString = localStorage.getItem('user');
            if (!userString) {
                setError('Please login to view cart');
                setCart({ items: [] }); // Ensures cart is always an object
                setLoading(false);
                return;
            }
    
            const user = JSON.parse(userString);
            const userId = user._id;
    
            const response = await getCart(userId);
            setCart(response.data || { items: [] }); // Ensures `items` is always present
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cart:', error);
            setError('Error loading cart');
            setCart({ items: [] }); // Prevent crashes by ensuring an empty cart object
            setLoading(false);
        }
    };
    
    const handleUpdateQuantity = async (productId, quantity) => {
        try {
            const userString = localStorage.getItem('user');
            const user = JSON.parse(userString);
            const userId = user._id;

            if(quantity <= 0) {
                // Remove item if quantity is 0 or negative
                await removeFromCart(userId, productId);
            } else {
                await updateCart(userId, productId, quantity);
            }
            
            fetchCart(); // Refresh cart after update
        } catch(error) {
            console.error('Error updating cart:', error);
            setError('Failed to update cart');
        }
    };

    if(loading) return ;
    if(error) return <div className="cart-error">{error}</div>;

    return (
        <>
        <Navbar/>
        {loading ? (
            <div className="cart-loading">Loading cart...</div>
        ) :(<div className="cart-container">
            <h1 className='titleforcart'>Your Cart</h1>

            <div className="divforheading">
                <p className='productClassName'>Product</p>
                <p className='priceclassname'>Price</p>
                <p className='quantityclassname'>Quantity</p>
                <p className='totalclassname'>Total</p>
            </div>
            {cart?.items?.length > 0 ? (
    <>
        <div className="cart-items">
            <div className='cart_eachItem'>
                {cart.items.map((item) => (
                    <div key={item.productId._id}>
                        <hr className='hrline'/>
                        <div className="cart-item">
                            <div className='divforcartimage'>
                                <img
                                    src={`http://localhost:5555/uploads/${item.productId.images}`}
                                    alt={item.productId.name}
                                    className="cart-details-image"
                                />
                            </div>
                            <div className="item-details">
                                <h4>{item.productId.name.slice(0,25)}</h4>
                                <p className="durtaioncart">Creator: {item.productId.creator.name}</p>
                                <p className="durtaioncart">Category: {item.productId.category}</p>
                                <p className="durtaioncart">Duration: {item.productId.duration}</p>
                            </div>
                            <div className='forpricecart'>
                                <p>₹{item.productId.price}</p>
                            </div>
                            <div className="quantity-controls">
                                <button 
                                    onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}
                                    className="quantity-btn"
                                >
                                    -
                                </button>
                                <span className="quantity">{item.quantity}</span>
                                <button 
                                    onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}
                                    className="quantity-btn"
                                >
                                    +
                                </button>
                            </div>
                            <p className="subtotal">
                                ₹{(item.productId.price * item.quantity).toFixed(2)}
                            </p>
                            <DeleteCart 
                                productId={item.productId._id} 
                                onDelete={handleUpdateQuantity} 
                            />
                        </div>
                    </div>
                ))}
                <hr className='hrline'/>
            </div>
            <div className='checkoutadded'>
                <div className="cart-total">
                    <div className="divorder1">Order Summary</div>
                    <div className="orderpart2">
                        <div className="subtoatal231">
                            <p>Subtotal:</p>
                            <p>₹{cart.items.reduce((total, item) => total + (item.productId.price * item.quantity), 0).toFixed(2)}</p>
                        </div>
                        <div className="subtoatal231">
                            <p>Shipping:</p><p>₹50</p>
                        </div>
                    </div>
                    <div className="totaldivpart3">
                        <p>Total:</p>
                        <p>₹{cart.items.reduce((total, item) => total + (item.productId.price * item.quantity) + 50, 0).toFixed(2)}</p>
                    </div>
                </div>
                <Checkout className='decorationforcheckoutbutton' userId={cart.userId} />
            </div>
        </div>
    </>
) : (
    <div className="empty-cart">
    <p>Your cart is empty</p>
    <button onClick={() => window.location.href = "/users"}>Go to Shop</button>
</div>
)}

        </div>)}
        </>
    );
};

export default Cart;
