import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import SellerBar from '../../components/sellerBar/SellerBar'
import "./create.css"
const Order = () => {
  return (
    <div>
        <div className="container">
            <Navbar/>
            <SellerBar/>
            <h2 className='headingofrorder'> Orders</h2>
            <div className="boxfororderofseller">
              
              <div className="mainconatainerfororder">
                <div className="boxofimageofproductseller">
                  <img src="./book.png" alt="book" height="150px" width="150px"  />
                </div>
                <div className="detailsoftheproduct">
                  <div className="detailsoftheproductpart1">
                    <p>name</p>
                    <p>Customername</p>
                  </div>
                  <div className="detailsoftheproductpart2">
                    <p>price</p>
                    <p>duration</p>
                  </div>
                </div>
                <div className="orderStaustdic">
                  <label>Select Order Status:</label>
                  <select >
                      <option>pending</option>
                      <option>accepted</option>
                      <option>delivered</option>
                      <option>cancel</option>
                      <option>On the way</option>
                  </select>
                  <button>Updated Status</button>
                </div>
                </div>
              <div className="mainconatainerfororder">
                <div className="boxofimageofproductseller">
                  <img src="./book.png" alt="book" height="150px" width="150px"  />
                </div>
                <div className="detailsoftheproduct">
                  <div className="detailsoftheproductpart1">
                    <p>name</p>
                    <p>Customername</p>
                  </div>
                  <div className="detailsoftheproductpart2">
                    <p>price</p>
                    <p>duration</p>
                  </div>
                </div>
                <div className="orderStaustdic">
                  <label>Select Order Status:</label>
                  <select >
                      <option>pending</option>
                      <option>accepted</option>
                      <option>delivered</option>
                      <option>cancel</option>
                      <option>On the way</option>
                  </select>
                  <button>Updated Status</button>
                </div>
                </div>
              <div className="mainconatainerfororder">
                <div className="boxofimageofproductseller">
                  <img src="./book.png" alt="book" height="150px" width="150px"  />
                </div>
                <div className="detailsoftheproduct">
                  <div className="detailsoftheproductpart1">
                    <p>name</p>
                    <p>Customername</p>
                  </div>
                  <div className="detailsoftheproductpart2">
                    <p>price</p>
                    <p>duration</p>
                  </div>
                </div>
                <div className="orderStaustdic">
                  <label>Select Order Status:</label>
                  <select >
                      <option>pending</option>
                      <option>accepted</option>
                      <option>delivered</option>
                      <option>cancel</option>
                      <option>On the way</option>
                  </select>
                  <button>Updated Status</button>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Order