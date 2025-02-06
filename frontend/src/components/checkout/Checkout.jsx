import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./checkout.css";

const Checkout = ({ userId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleCheckout = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Load Razorpay SDK
            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
            if (!res) {
                throw new Error('Razorpay SDK failed to load');
            }

            // Create order
            const { data } = await axios.post(
                `http://localhost:5555/payment/create-order`,
                { userId },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!data.orderId || !data.amount || !data.key) {
                throw new Error('Invalid response from server');
            }

            const options = {
                key: data.key,
                amount: data.amount * 100, // Convert to paise
                currency: "INR",
                name: "FlexiRent",
                description: "Transaction",
                order_id: data.orderId,
                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post(
                            'http://localhost:5555/payment/verify-payment',
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            },
                            {
                                headers: {
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                                    'Content-Type': 'application/json'
                                }
                            }
                        );

                        if (verifyRes.data.orderId) {
                            // Show success message
                            alert("Payment Successful!");

                            // Redirect to order confirmation page
                            window.location.href = `/orderconfirm/${verifyRes.data.orderId}`;

                            // Redirect to home page after 5 seconds
                            setTimeout(() => {
                                window.location.href = '/';
                            }, 5000);
                        }
                    } catch (error) {
                        console.error("Verification error:", error);
                        setError(error.response?.data?.error || "Payment verification failed");
                    }
                },
                prefill: {
                    name: localStorage.getItem('userName') || "",
                    email: localStorage.getItem('userEmail') || "",
                    contact: localStorage.getItem('userPhone') || ""
                },
                theme: {
                    color: "#3399cc"
                },
                modal: {
                    ondismiss: function() {
                        setIsLoading(false);
                    }
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', function (response) {
                setError(response.error.description);
                setIsLoading(false);
            });
            paymentObject.open();
        } catch (error) {
            console.error("Checkout error:", error);
            setError(error.response?.data?.error || error.message || "Error initiating payment");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button 
                onClick={handleCheckout} 
                className="checkout-btn"
                disabled={isLoading}
            >
                {isLoading ? 'Processing...' : 'Checkout'}
            </button>
            {error && (
                <div className="error-message text-red-500 mt-2">
                    {error}
                </div>
            )}
        </div>
    );
};

export default Checkout;
