import React, { useEffect, useState } from 'react'
import "./create.css"
import Navbar from '../../components/navbar/Navbar'
import SellerBar from '../../components/sellerBar/SellerBar'
import CardProductSeller from '../../components/card_seller_product/CardProductSeller'
import axios from 'axios'

const GetProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('token');

            const response = await axios.get('http://localhost:5555/products/seller', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.data) {
                setProducts(response.data.data);
                setError(null);
            } else {
                setProducts([]);
                console.log("No products found in response");
            }
        } catch(e) {
            console.error("Error details:", e.response ? e.response.data : e.message);
            setError(e.response?.data?.message || "Failed to fetch products");
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleUpdateProduct = (updatedProduct) => {
        setProducts(prevProducts => 
            prevProducts.map(product => 
                product._id === updatedProduct._id ? updatedProduct : product
            )
        );
    };

    const handleDeleteProduct = (productId) => {
        setProducts(prevProducts => 
            prevProducts.filter(product => product._id !== productId)
        );
    };

    if (isLoading) {
        return (
            <div className='main_Boss'>
                <div className="container">
                    <Navbar/>
                    <SellerBar/>
                    <div className="Products_card_seller">
                        <p>Loading products...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='main_Boss'>
                <div className="container">
                    <Navbar/>
                    <SellerBar/>
                    <div className="Products_card_seller">
                        <p>Error: {error}</p>
                        <button onClick={fetchProducts}>Retry</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='main_Boss'>
            <div className="container">
                <Navbar/>
                <SellerBar/>
                <div className="Products_card_seller">
                    <CardProductSeller 
                        product={products}
                        onUpdateProduct={handleUpdateProduct}
                        onDeleteProduct={handleDeleteProduct}
                    />
                </div>
            </div>
        </div>
    )
}

export default GetProducts