import React from 'react';
import { addToCart } from '../../assets/helper.jsx';
import "./cartadd.css"
const AddCart = ({ productId, vendorId }) => {  // ✅ Pass vendorId from props
  const handleAddToCart = async () => {
    try {
      const userString = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!userString || !token) {
        alert('Please login first');
        return;
      }

      const user = JSON.parse(userString);
      const userId = user._id;

      if (!vendorId) {
        console.warn("⚠️ Vendor ID is missing!");
        alert("Vendor ID is required to add this item to cart.");
        return;
      }

      const response = await addToCart(userId, productId, vendorId, 1);

      if (response.status === 200) {
        alert('Product added to cart successfully');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error.response?.data?.error || 'Failed to add product to cart');
    }
  };

  return (
    <button onClick={handleAddToCart} className="add-to-cart-button">
      Add to Cart
    </button>
    
  );
};

export default AddCart;

