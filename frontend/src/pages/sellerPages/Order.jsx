import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import SellerBar from '../../components/sellerBar/SellerBar'
import "./create.css"
import axios from 'axios'

const Order = () => {
  const [orders, setOrders] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';

  const fetchOrder = async () => { 
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_URL}/order/sellerorder`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      console.log("API response:", response.data);
      if (response.data.orders) {
        setOrders(response.data.orders)
      } else {
        setOrders([]);
        console.log("No products found in response");
      }
    } catch (e) {
      console.error("Error details:", e.response ? e.response.data : e.message);
      setOrders([]);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div>
      <div className="container">
        <Navbar/>
        <SellerBar/>
        <h2 className='headingofrorder'>Orders</h2>
        <div className="boxfororderofseller">
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="order-block">
                <h4>Customer Name: {order.userId?.name}</h4>
                <h5>Total Amount: ₹{order.totalAmount}</h5>
                <div>
                  <strong>Products:</strong>
                  <ul>
                    {order.vendorPayments.map((payment, paymentIdx) =>
                      payment.items.map((item, itemIdx) => (
                        <li key={item._id || `${paymentIdx}-${itemIdx}`}>
                          <div style={{marginBottom: '10px'}}>
                           
                            <span style={{fontWeight: 'bold'}}>{item.productId.name}</span>
                            <span> | Duration: {item.productId.duration}</span>
                            <span> | Price: ₹{item.price}</span>
                            <span> | Quantity: {item.quantity || payment.quantity}</span>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
                <div>
                  <label>Select Order Status:</label>
                  <select defaultValue={order.status}>
                    <option value="pending">pending</option>
                    <option value="accepted">accepted</option>
                    <option value="delivered">delivered</option>
                    <option value="cancel">cancel</option>
                    <option value="On the way">On the way</option>
                  </select>
                  <button>Update Status</button>
                </div>
                <hr/>
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Order
