import React from 'react'
import "./sellerHome.css"
import Navbar from '../../components/navbar/Navbar'
import SellerBar from '../../components/sellerBar/SellerBar'
const SellerHome = () => {
  return (
    <div>
        <div className="sellerMainContainer">
            <Navbar/>
            <SellerBar/>
        </div>
    </div>
  )
}

export default SellerHome