import React from 'react'
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "./cardproductseller.css"

const CardProductSeller = ({product}) => {
  if (!product || product.length === 0) {
    return <div className='boxOfproduct1'>No products found</div>;
  }

  return (
    <div className='mainBox'>
      {product.map((item) => ( // Changed 'product' to 'item' to avoid naming confusion
        <div key={item._id} className="boxOfproduct">
            <div className="imgProduct">
                <img className='imgProductSeller' src={`http://localhost:5555/uploads/${item.images}`} alt="person" />
                {console.log("Image URL:", `http://localhost:5555/uploads/${item.image}`)}
            </div>
            <p className='productName'>Name: {item.name}</p>
            <div className="details">
              <p>price: ₹{item.price}</p>
              <p>stock: {item.stock}</p>
            </div>
           
            <div className="icons">
                <MdOutlineModeEdit className='editicons'/>
                <MdDelete className='deleteicon'/>
            </div>
        </div>
      ))}
    </div>
  )
}

export default CardProductSeller