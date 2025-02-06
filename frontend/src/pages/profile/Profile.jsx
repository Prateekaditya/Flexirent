import React, { useState } from 'react'
import AddressDisplay from '../../components/addAdress/AddressDisplay'
import "./profile.css"
import AdrressForm from '../../components/addAdress/AdrressForm'
import Navbar from "../../components/navbar/Navbar"
const Profile = () => {
    const [showAddressForm,setShowAddressForm]=useState(false)
    const userId =localStorage.getItem('userId')
  return (
    <>
        <Navbar/>
        <div className="containerForAddress">
            <AddressDisplay userId={userId}/>
            
            <button className='buttonforaddressclicking' onClick={()=>setShowAddressForm(!showAddressForm)}>

                {showAddressForm ? "Hide Form ":"Add New Address" }
            </button>
            {showAddressForm && <AdrressForm/>}
        </div>
    </>
  )
}

export default Profile