import React, { useEffect, useState } from 'react'
import "./sellerBar.css"
import { Link, useNavigate } from 'react-router-dom'
import { CiLogout } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa6";
import { GoCodeReview } from "react-icons/go";


const SellerBar = () => {
  const navigate = useNavigate();
  const handleLogout = ()=> {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/')
  }
  // const [select ,setSelect]=useState('');

  // const onSelect =(itemName) =>{
  //   setSelect(itemName)
  //   console.log(itemName)
  // }
  const [select, setSelect] = useState('/seller');

  // Update active item based on current URL path
  useEffect(() => {
    const path = window.location.pathname;
    setSelect(path);
  }, []);
  return (
    <div>
        <div className="sellerBarBOdy">
            <span className={`sellerEdit ${select==='/seller' ? 'active':''}`} onClick={() => setSelect('/seller')}><MdDashboard/><Link className='linkOfSeller' to='/seller'>Dashboard</Link></span>
            <span className={`sellerEdit ${select==='/products' ? 'active':''}`} onClick={() => setSelect('/products')}><FaBox/><Link className='linkOfSeller' to='/products'>Products</Link></span>
            <span className={`sellerEdit ${select==='/create' ? 'active':''}`} onClick={() => setSelect('/create')}><IoMdCreate/><Link className='linkOfSeller' to='/create'>Create</Link></span>
            <span className={`sellerEdit ${select==='/order' ? 'active':''}`} onClick={() => setSelect('/order')}><FaCartPlus/><Link className='linkOfSeller' to='/order'>Order</Link></span>
            <span className={`sellerEdit ${select==='/review' ? 'active':''}`} onClick={() => setSelect('/review')}><GoCodeReview/><Link className='linkOfSeller' to='/review'>Review</Link></span>
            <span className='sellerEdit'><CiLogout/><span className='linkOfSeller' onClick={handleLogout}>Logout</span></span>

        </div>
    </div>
  )
}

export default SellerBar