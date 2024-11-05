import React from 'react'
import "./sellerBar.css"
import { Link } from 'react-router-dom'
import { CiLogout } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa6";
import { GoCodeReview } from "react-icons/go";
const SellerBar = () => {
  return (
    <div>
        <div className="sellerBarBOdy">
            <span className='sellerEdit'><MdDashboard/><Link className='linkOfSeller' to='/seller'>Dashboard</Link></span>
            <span className='sellerEdit'><FaBox/><Link className='linkOfSeller' to='/products'>Products</Link></span>
            <span className='sellerEdit'><IoMdCreate/><Link className='linkOfSeller' to='/create'>Create</Link></span>
            <span className='sellerEdit'><FaCartPlus/><Link className='linkOfSeller' to='/order'>Order</Link></span>
            <span className='sellerEdit'><GoCodeReview/><Link className='linkOfSeller' to='/review'>Review</Link></span>
            <span className='sellerEdit'><CiLogout/><Link className='linkOfSeller' to='/login'>Logout</Link></span>

        </div>
    </div>
  )
}

export default SellerBar