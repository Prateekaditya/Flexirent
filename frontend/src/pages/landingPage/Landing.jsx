import React, { useEffect, useState } from 'react'
import "./landing.css"
import Navbar from '../../components/navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { IoSparklesOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { GiShop } from "react-icons/gi";
import { CiShop } from "react-icons/ci";
const Landing = () => {
    const [role,setUserRole]=useState(' ');
    useEffect(()=>{
        const detaitls = ()=>{
            try{
                const response = localStorage.getItem('user')
                if(response){
                    const {role}= JSON.parse(response)
                    setUserRole(role);
                    console.log(role)
                }
            }
            catch(e){
                console.log(e.message)
            }
        }
        detaitls();
    },[])

  return (
    <>
        <div className="landing_container">
            <div className="part_container">
                <Navbar/>
                <div className="otherPart">
                    <div className="imageofLanding">
                        <img className='amanwithlappi' src="./Personlaptop.png" alt="lappiPerson"/>
                    </div>
                    <div className="rolesgetting">
                        <div className="flexititle">
                            <IoSparklesOutline className='firstsparkles'/>
                                 <h1 className="gradient-text">
                                Your Perfect Space, Your Way
                                </h1>
                            <IoSparklesOutline className='secondsparkles' />
                        </div>
                        <h5><center>Join FlexiRent as either a seller offering products for rent or a customer searching for items to rent</center></h5>
                        <div className="roles">
                            { role === 'seller'?(
                            <Link className='sellerLink' to='/seller'><div className="seller">
                                <CiShop  className='rolesicon'/>
                                <span> Seller</span>
                                {/* <p><center>List your products and reach thousands of potential customers through our expansive marketplace</center></p> */}
                            </div></Link>):role==='customer'?(
                            <div className="customer">
                                <FaUser className='rolesicon'/>
                                <span>Customer</span>
                            </div>):(<div>
                                You Have No role
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Landing