import React from 'react'
import "./create.css"
import Navbar from '../../components/navbar/Navbar'
import SellerBar from '../../components/sellerBar/SellerBar'

const Create = () => {
  return (
    <div>
        <div className="vonatiner">
        <Navbar/>
        <SellerBar/>
        <div className="formforCreation">
            <h4>Create Your Product</h4>
            <form className='form_creation_product' action="/create" method='post' encType='multipart/form-data'>
                <label className='form_creation_label' name='name' >Name:
                    <input className='inputForCreation' type="text" placeholder='Enter the Name of the product' name='name'></input>
                    </label>
                <label className='form_creation_label' name='description' >Description:
                    <textarea name="description" className='inputForCreation' cols="30" rows="5" placeholder='Enter the details'></textarea>
                    </label>
                <label className='form_creation_label' name='category' >Category:
                <select className='inputForCreation'
              name="category"
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="home">Home & Garden</option>
            </select>
                    </label>
                <label className='form_creation_label' name='price' >Price:
                <input className='inputForCreation' type="text" placeholder='Enter the Price of the Product' name='price'></input>
                </label>  
                <label className='form_creation_label' name='stock' >Stock:
                <input className='inputForCreation' type="text" placeholder='Enter the Stocks' name='stock'></input>
                </label>  
                <label className='form_creation_label' name='duration' >Duration:<div>
                <input className='inputForCreation2' type="text"  name='duration' min={'1'} max={'12'}></input>
                <select className='inputForCreationoption' name="duration" >
                <option value="">Select a duration</option>
              <option value="months">Months</option>
              <option value="year">years</option>
                </select></div>
                </label>  
                <label className='form_creation_label' name='iamge' >Image:
                <input className='inputForCreation' type="file"  name='image'></input>
                </label>
            </form>
        </div></div>
    </div>
  )
}

export default Create