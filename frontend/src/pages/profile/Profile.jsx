import React, { useState } from 'react'
import AddressDisplay from '../../components/addAdress/AddressDisplay'
import './profile.css'
import AdrressForm from '../../components/addAdress/AdrressForm'
import Navbar from '../../components/navbar/Navbar'
import { FaMapMarkerAlt, FaPlus, FaTimes } from 'react-icons/fa'

const Profile = () => {
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const userId = localStorage.getItem('userId');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleAddressAdded = () => {
        setShowAddressForm(false);
        setRefreshKey(k => k + 1); // re-fetch addresses
    };

    return (
        <>
            <Navbar />
            <div className="profile-page">

                {/* Profile hero card */}
                <div className="profile-hero">
                    <div className="profile-avatar">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="profile-hero-info">
                        <h1>{user.name || 'User'}</h1>
                        <p>{user.email}</p>
                        <span className="profile-role-badge">{user.role || 'customer'}</span>
                    </div>
                </div>

                {/* Addresses section */}
                <div className="profile-section">
                    <div className="profile-section-header">
                        <div className="profile-section-title">
                            <FaMapMarkerAlt />
                            <h2>Saved Addresses</h2>
                        </div>
                        <button
                            className={`profile-add-btn${showAddressForm ? ' active' : ''}`}
                            onClick={() => setShowAddressForm(v => !v)}
                        >
                            {showAddressForm ? <><FaTimes /> Cancel</> : <><FaPlus /> Add Address</>}
                        </button>
                    </div>

                    {showAddressForm && (
                        <div className="profile-form-wrapper">
                            <AdrressForm onSuccess={handleAddressAdded} />
                        </div>
                    )}

                    <AddressDisplay key={refreshKey} userId={userId} />
                </div>

            </div>
        </>
    );
};

export default Profile