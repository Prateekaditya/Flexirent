import React from 'react'
import { Link } from 'react-router-dom';
import "./footer.css"
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
const Footer = () => {
  return (
    <>
    <div className="footerBody">
        <p>Quick Links</p>
        <div className="footerLinksMAny">
            <Link className='linkoffooter' to="./aboutus">About Us</Link>
            <Link className='linkoffooter' to="./aboutus">Terms & Conditions</Link>
            <Link className='linkoffooter' to="./aboutus">Privacy Policy</Link>
            <Link className='linkoffooter' to="./aboutus">Help</Link>
            <Link className='linkoffooter' to="./aboutus">Customer Care</Link>
        </div>
        <div className="iconsOfMedia">
            <FaInstagram className='instagram'/>
            <CiFacebook className='facebook'/>
            <CiLinkedin className='linkdin'/>
        </div>
        <span>Prateekaditya@creations</span>
    </div>
    </>
  )
}

export default Footer