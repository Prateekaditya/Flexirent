import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import SellerBar from '../../components/sellerBar/SellerBar'
import "./create.css"
const Order = () => {
  return (
    <div>
        <div className="container">
            <Navbar/>
            <SellerBar/>
        </div>
    </div>
  )
}

export default Order