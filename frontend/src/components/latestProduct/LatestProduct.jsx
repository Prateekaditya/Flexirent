import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./latestproduct.css"
const LatestProduct = ({ limit = 3 }) => {
    const [latestProducts, setLatestProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLatestProducts = async () => {
            try {
                // Get auth token from localStorage
                const authToken = localStorage.getItem('token');
                console.log(authToken)
                // Fetch latest products
                const response = await axios.get(`http://localhost:5555/products/latest?limit=${limit}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                // Update state with fetched products
                setLatestProducts(response.data.data);
                setLoading(false);
            } catch (err) {
                // Log full error details
                console.error('Full error:', err);
                console.error('Error response:', err.response);
                
                // More detailed error message
                const errorMsg = err.response 
                    ? err.response.data.message 
                    : 'Network error or server is not responding';
                
                setError(errorMsg);
                setLoading(false);
            }
        };
    
        fetchLatestProducts();
    }, [limit]);

    if (loading) {
        return <div className="latest-products-loading">Loading latest products...</div>;
    }

    if (error) {
        return <div className="latest-products-error">{error}</div>;
    }

    return (
        <div className="latest-products-container">
            <h2>Latest Products</h2>
            <div className="latest-products-grid">
                {latestProducts.map((product) => (
                    <div key={product._id} className="latest-product-card">
                        <img 
                            src={`http://localhost:5555/uploads/${product.images}`} 
                            alt={product.name} 
                            className="latest-product-image"
                        />
                        <div className="latest-product-details">
                            <h3>{product.name}</h3>
                            <p>Price: ₹{product.price}</p>
                            <Link 
                                to={`/product/${product._id}`} 
                                className="view-product-button"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestProduct;