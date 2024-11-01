import React, { useState } from 'react'
import "./navbar.css"
import { FaLaptopHouse } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div>
        <div className="navbarbox">
            <h1>FlexiRent <FaLaptopHouse className='iconOflaptop'/> </h1>
            <div className="login_register">
                <Link  className='login_register_link' to='/login'>Login/Register</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar