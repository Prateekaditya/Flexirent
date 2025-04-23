import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import "./userOrder.css";

const UserOrder = () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';
    const [orderProduct, setOrderedProduct] = useState([]);

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log("Login first");
                return;
            }

            const response = await axios.get(`${API_URL}/order/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Fetched Orders:", response.data.orders);
            setOrderedProduct(response.data.orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    return (
        <div className="mainBoxOrder">
            <Navbar />
            <div className="divforheading">
                <p>MY ORDERS</p>
            </div>
            <div className="boxFororder">
                {orderProduct.length > 0  ? (
                    orderProduct
                    .filter(order => order.status === "completed")
                    .map((item, index) => (
                        <div className="fstOrder" key={index}>
                            <div className="imgdivfororder">
                                <img className='imgofordder' src={`${API_URL}/uploads/${item.vendorPayments[0].items[0].productId.images}`} height='100px' width='100px' alt="book" />
                            </div>
                            <div className="detailsForOrder">
                                <p>Name:{item.vendorPayments[0]?.items[0]?.productId.name.slice(0,42)}...</p>
                                <p>Seller: {item.vendorPayments[0]?.vendorId.name || "Unknown"}</p>
                                <p>Price: {item.vendorPayments[0]?.items[0]?.productId.price || "0"} </p>  
                            </div>
                            <div className="divpaymentStatus">
                                <p>Payment Status: {item.status}</p>
                            </div>
                            <div className='statusoforder'>
                                <p>Order Status: {item.vendorPayments[0]?.status}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="noprod">
                        NO PRODUCTS ORDERED! PLACE AN ORDER!
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserOrder;
