import React, { useState } from 'react'
import "./navbar.css"
import { FaLaptopHouse } from "react-icons/fa";
import { FaSearch,FaHome } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isLogin,setLogin]=useState(true)
  const [userRole,setUserRole] = useState('seller')
  const [isOpen,setOpen] =useState(false)

  const toggleDropDown =()=>{
    setOpen(!isOpen)
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
            <span>Seller</span>
          </div>
          {isOpen && (<div className='menu_dropdown'>
            <Link className="nav-link" to="/seller"><FaHome/>Home</Link>
             <Link className="nav-link" to="/login"><BiLogOut/>Logout</Link>
          </div>)}
          </div>
          </>
         ) : (
           // Links specific to customer role
           <>
             <Link className="nav-link" to="/products">Products</Link>
             <Link className="nav-link" to="/cart">Cart</Link>
           </>
        )}
       </div>
           )}
            
            <div className="login_register">
                {isLogin ?
                 (''):(<Link  className='login_register_link' to='/login'>Login/Register</Link>)}
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
