import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./checkout.css";

const Checkout = ({ userId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';
    useEffect(() => {
        let isMounted = true;  // ✅ Prevent state update on unmounted component

        const fetchAddresses = async () => {
            if (!userId) return; // ✅ Prevent API call if userId is undefined

            try {
                setIsLoading(true);
                const token = localStorage.getItem('token');

                const response = await axios.get(`${API_URL}/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log("API Response:", response.data.user); // Debug API response

                if (isMounted) {
                    setAddresses(response.data.user.address || []); // ✅ Corrected the assignment
                }
            } catch (e) {
                console.error("Error fetching user details:", e.message);
            } finally {
                if (isMounted) setIsLoading(false); // ✅ Only set state if component is still mounted
            }
        };

        fetchAddresses();

        return () => {
            isMounted = false; // ✅ Cleanup function to prevent state updates after unmount
        };
    }, [userId]);

    const handleCheckout = async () => {
        if (!selectedAddress) {
            setError("Please select an address");
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const res = await axios.post(
                `${API_URL}/payment/create-order`,
                { userId, selectedAddress },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!res.data.orderId || !res.data.amount || !res.data.key) {
                throw new Error('Invalid response from server');
            }

            const options = {
                key: res.data.key,
                amount: res.data.amount * 100,
                currency: "INR",
                name: "FlexiRent",
                description: "Transaction",
                order_id: res.data.orderId,
                handler: async function (response) {
                    try {
                        await axios.post(
                            `${API_URL}/payment/verify-payment`,
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
                        alert("Payment Successful!");
                        window.location.href = `/orderconfirm/${res.data.orderId}`;
                    } catch (error) {
                        setError("Payment verification failed");
                    }
                },
                prefill: {
                    name: localStorage.getItem('userName') || "",
                    email: localStorage.getItem('userEmail') || "",
                    contact: localStorage.getItem('userPhone') || ""
                },
                theme: { color: "#3399cc" },
                modal: { ondismiss: () => setIsLoading(false) }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Checkout error:", error);
            setError(error.message || "Error initiating payment");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='mainboxforcheck'>
            <div className="divforthis">
            <h3>Select Delivery Address:</h3>
            <select className='editforaddress' onChange={(e) => setSelectedAddress(e.target.value)} value={selectedAddress}>
                <option value="">Select Address</option>
                {addresses.length > 0 ? (
                    addresses.map(addr => (
                        <option key={addr._id} value={addr._id}>
                            {addr.address1}, {addr.address2}, {addr.city}, {addr.state}, {addr.pincode}
                        </option>
                    ))
                ) : (
                    <option disabled>No addresses available</option>
                )}
            </select></div>

            <button 
                onClick={handleCheckout} 
                className="checkout-btn"
                disabled={isLoading || addresses.length === 0}
            >
                {isLoading ? 'Processing...' : 'Checkout'}
            </button>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default Checkout;
