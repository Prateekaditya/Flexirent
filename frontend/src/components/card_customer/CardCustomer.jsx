import React, { useEffect,useState } from 'react'
import "./cardcustomer.css"
import axios from 'axios'
import AddCart from '../for_cart/AddCart';
import { BsCartPlus } from "react-icons/bs";
import Addtocartproduct from '../for_cart/Addtocartproduct';
import { Link } from 'react-router-dom';
const CardCustomer = () => {
  const [product,setProducts]=useState([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';
  const getProduct = async()=>{
    try{
      const response =  await axios.get(`${API_URL}/products/`,
         {
      headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'                            
     }
     })
     console.log(response.data.data);
     setProducts(response.data.data);
    }
    catch(e){
      console.log(e.message)
    }
  }
        useEffect(() => {
         getProduct();
          
        }, [])
      
  
  return (


    <>
    <div className="mainDivForCustomerCard">
        <div className="mainBodyCard">
            {product.map((item)=>(
              <div key={item._id} className='boxofItems'  >
                <Link to={`/product/${item._id}`} className='linkofthebox'> 
                  <div className="imagesbox">
                    <img src={`${item.images}`} 
                    alt={item.name} 
                    className='imgsizebox'
                    />
                  </div>
                  <div className="boxfornameaddcart">
                  <div className="namecontentprice">
                    <p>{item.name.slice(0,20)}</p>
                    <p>₹{item.price}</p>
                  </div>
                  <div className="boxofaddingcart" >
                    <Addtocartproduct productId={item._id} vendorId={item.creator._id} className="letsee"/>
                  </div></div></Link>
                </div>
            ))}
        </div>
    </div>
    </>
  )
}

export default CardCustomer