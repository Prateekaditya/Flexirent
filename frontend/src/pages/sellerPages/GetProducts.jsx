import React, { useEffect, useState } from 'react'
import "./create.css"
import Navbar from '../../components/navbar/Navbar'
import SellerBar from '../../components/sellerBar/SellerBar'
import CardProductSeller from '../../components/card_seller_product/CardProductSeller'
import axios from 'axios'

const GetProducts = () => {
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        
  
        const response = await axios.get('http://localhost:5555/products/seller', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        
        if (response.data.data) {
          setProducts(response.data.data);
        } else {
          console.log("No products found in response");
        }
      }
      catch(e) {
        console.log("Error details:", e.response ? e.response.data : e.message);
      }
    };
    
    fetchProducts();
  }, []);
  return (
    <div className='main_Boss'>
        <div className="container">
            <Navbar/>
            <SellerBar/>
            <div className="Products_card_seller">
                <CardProductSeller product={products}/>
            </div>
        </div>
    </div>
  )
}

export default GetProducts