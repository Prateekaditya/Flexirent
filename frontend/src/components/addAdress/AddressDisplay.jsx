import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure you import axios
import "./address.css";

const AddressDisplay = ({ userId }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log("API Response:", response); // Debug API response
                setUserInfo(response.data.user);
            } catch (e) {
                console.log("Error fetching user details:", e.message);
            } finally {
                setLoading(false); // Stop loading after API call
            }
        };

        fetchUserInfo(); // Call the function
    }, [userId]);

    // ✅ Handle loading state and prevent accessing properties of `null`
    if (loading) {
        return <p>Loading...</p>;
    }

    if (!userInfo) {
        return <p>Error: Unable to fetch user details.</p>;
    }

    return (
        <div className="displayAddressContainer">
            <p>{userInfo?.name}</p> 
            <p>{userInfo?.email}</p> 
            <p>{userInfo?.role}</p> 
            <h2>Saved Address</h2>
            <div className="detailsboxaddress">
                {userInfo?.address?.map((detail) => (
                    <div key={detail._id} className='hehehehehdetails'>
                        <p>Deliver To: {userInfo?.name}</p>
                        <p>{detail?.address1} {detail?.address2}</p>
                        <h5>{detail?.city}, {detail?.state} - {detail?.pincode}</h5>
                        <p>Mobile: {userInfo?.phoneNumber}</p>
                        <h4>{detail?.country}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddressDisplay;
