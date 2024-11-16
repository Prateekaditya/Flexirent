import React, { useEffect, useState } from 'react'
import "./navbar.css"
import { FaLaptopHouse } from "react-icons/fa";
import { FaSearch,FaHome } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
const Navbar = () => {
  const navigate = useNavigate()
  const [isLogin,setLogin]=useState(false)
  const [userRole,setUserRole] = useState('')
  const [isOpen,setOpen] =useState(false)
  const [name,setName]=useState('')
  useEffect(()=>{
    const checkLoginStatus = ()=>{
    const userString = localStorage.getItem('user')
    const token = localStorage.getItem('token')


    try{
     const user =userString ? JSON.parse(userString) : null
     if(user && token){
      setLogin(true)
      setUserRole(user.role)
      setName(user.name)
     }
     else{
      setLogin(false)
      setUserRole(null)
     }
    }
    catch (e){
      console.log(e.message)
      setLogin(false)
      setUserRole(null)
    }
    }
    checkLoginStatus()
    window.addEventListener('storage',checkLoginStatus)
    
    return ()=>{
      window.removeEventListener('storage',checkLoginStatus)
    }
  },[])

  const toggleDropDown =()=>{
    setOpen(!isOpen)
  }
  const handleLogout = ()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setLogin(false)
    setUserRole(null)
    navigate('/login')
  }
  return (
    <div>
        <div className="navbarbox">
            <h1>FlexiRent <FaLaptopHouse className='iconOflaptop'/> </h1> 

           {isLogin && ( 
         <div className="nav-links">
         {userRole === 'seller' ? (
           // Links specific to seller role
           <>
           <div className="forseller">
          <div className='inputfieldDiv'> <input className='inputForseller' type='text' placeholder='Search'></input> <FaSearch className='input_serach'/></div>
          <div className="forProfile" onClick={toggleDropDown}>
            <FaUserTie/>
            <span>{name}</span>
          </div>
          {isOpen && (<div className='menu_dropdown'>
            <Link className="nav-link" to="/seller"><FaHome/>Home</Link>
             <span className="nav-link"  onClick={handleLogout}><BiLogOut/>Logout</span>
          </div>)}
          </div>
          </>
         ) : (
           // Links specific to customer role
           <>
             {/* <Link className="nav-link" to="/products">Products</Link>
             <Link className="nav-link" to="/cart">Cart</Link> */}
                        <div className="forseller">
          <div className='inputfieldDivuser'> <input className='inputForuser' type='text' placeholder='Search'></input> <FaSearch className='input_serach'/></div>
          <div className="forProfile" onClick={toggleDropDown}>
            <FaUserTie/>
            <span>{name}</span>
          </div>
          <div className="pagelinkforUser">
            <div><p>Home</p></div>
            <div><p>Categories</p></div>
           <div> <p>Services</p></div>
            <div><p>Contact Us</p></div>
           <div> <p>About us</p></div>
           <div><Link to='/cart'> <FaShoppingCart className='cart'/></Link></div>
          </div>
          {isOpen && (<div className='menu_dropdown'>
            <Link className="nav-link" to="/users"><FaHome/>Home</Link>
            <Link className="nav-link" to="/cart"><FaShoppingCart/>Cart</Link>
             <span className="nav-link"  onClick={handleLogout}><BiLogOut/>Logout</span>
          </div>)}
          </div>
           </>
        )}
       </div>
           )}
            
            <div className="login_register">
                {!isLogin && (<Link  className='login_register_link' to='/login'>Login/Register</Link>)}
            </div>
        </div>
    </div>
  )
}

export default Navbar
// import React, { useState } from 'react';
// import './navbar.css';
// import { FaLaptopHouse } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   // State to manage if user is logged in
//   const [isLogin, setLogin] = useState(true);

//   // State to manage user role ("seller" or "customer")
//   const [userRole, setUserRole] = useState('customer'); // Change this to 'seller' or 'customer' as needed

//   return (
//     <div className="navbarbox">
//       <h1>
//         FlexiRent <FaLaptopHouse className="iconOflaptop" />
//       </h1>
//       <div className="nav-links">
//         {userRole === 'seller' ? (
//           // Links specific to seller role
//           <>
//             <Link className="nav-link" to="/seller-dashboard">Dashboard</Link>
//             <Link className="nav-link" to="/add-product">Add Product</Link>
//           </>
//         ) : (
//           // Links specific to customer role
//           <>
//             <Link className="nav-link" to="/products">Products</Link>
//             <Link className="nav-link" to="/cart">Cart</Link>
//           </>
//         )}
//       </div>
//       <div className="login_register">
//         {isLogin ? (
//           <Link className="login_register_link" to="/logout">Logout</Link>
//         ) : (
//           <Link className="login_register_link" to="/login">Login/Register</Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
