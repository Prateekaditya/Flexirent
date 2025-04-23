import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderConfirm = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const { data } = await axios.get(
                    `${API_URL}/payment/${orderId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json'                            
                        }
                    }
                );
                setOrderDetails(data);
            } catch (error) {
                setError(error.response?.data?.error || "Failed to fetch order details");
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }

        // Redirect to home after 5 seconds
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        return () => clearTimeout(timer);
    }, [orderId,navigate]);

    return (
        <div className="order-confirm-container">
            {error ? (
                <div className="error-message">{error}</div>
            ) : orderDetails ? (
                <div className="order-details">
                    <h2>Order Confirmed!</h2>
                    <p>Order ID: {orderDetails._id}</p>
                    <p>Total Amount: ₹{orderDetails.totalAmount}</p>
                    <p>Payment Status: {orderDetails.status}</p>
                    <p>Redirecting to home in 5 seconds...</p>
                </div>
            ) : (
                <p>Loading order details...</p>
            )}
        </div>
    );
};

export default OrderConfirm;
