import React from 'react';
import { addToCart } from '../../assets/helper.jsx';

const AddCart = ({ productId }) => {
  const handleAddToCart = async () => {
    try {
      const userString = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!userString || !token) {
        alert('Please login first');
        return;
      }

      const user = JSON.parse(userString);
      const userId = user._id; // Make sure your user object has _id

      // Pass userId as the first parameter
      const response = await addToCart(
        userId,
        productId,
        user.vendorId || null,
        1
      );

      if (response.status === 200) {
        alert('Product added to cart successfully');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      if (error.response?.status === 401) {
        alert('Please login again');
      } else {
        alert(error.response?.data?.error || 'Failed to add product to cart');
      }
    }
  };

  return (
    <button onClick={handleAddToCart} className="add-to-cart-button">
      Add to Cart
    </button>
  );
};

export default AddCart;
