import React, { useState } from 'react'
import "./create.css"
import Navbar from '../../components/navbar/Navbar'
import SellerBar from '../../components/sellerBar/SellerBar'
import Swal from "sweetalert2"
import axios from "axios"
const Create = () => {
  const [name,setName]=useState('')
  const [description,setDescription]=useState('')
  const [category,setCategory]=useState('')
  const [price,setPrice]=useState('')
  const [duration,setDuration]=useState('')
  const [durationUnit,setDurationUnit]=useState('')
  const [stock,setStock]=useState('')
  const [images,setImages]=useState();
  const [error,setError]=useState('')
  const handleSubmit =async(e)=>{
    e.preventDefault();
    const durationFull =  `duration durationUnit`
    if(!name){
      setError('Please Provide a name')
      return;
    }
    if(!description){
      setError('Please Provide a description')
      return;
    }
    if(!durationFull){
      setError('Please Provide a duration')
      return;
    }
    if(!stock){
      setError('Please Provide a stocks')
      return;
    }
    if(!price){
      setError('Please Provide a price')
      return;
    }
    if(!images){
      setError('Please Provide a image')
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('duration', durationFull);
    formData.append('stock', stock);
    formData.append('image', images);
    
    try{
      const authToken = localStorage.getItem('token');
      await axios.post('http://localhost:5555/products/create',
        formData,
      {
        headers:{
          'Authorization':`Bearer ${authToken}`,
          'Content-Type':'multipart/form-data',
        }
      }
      )
      await Swal.fire({
        title: 'Product Created!',
        text: 'Your product has been successfully created.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
    catch(e){
      setError(e.message)
      console.log(e.message)
      console.log(images);
    }
  }
  return (
    <div>
        <div className="vonatiner">
        <Navbar/>
        <SellerBar/>
        <div className="boxforcreation">
        <div className="formforCreation">
            <h4>Create Your Product</h4>
            <form className='form_creation_product' action="/create" method='post' encType='multipart/form-data' onSubmit={handleSubmit}>
                <label className='form_creation_label' name='name' >Name:
                    <input className='inputForCreation' type="text" placeholder='Enter the Name of the product' name='name' value={name} 
                    onChange={(e)=>setName(e.target.value)}></input>
                    </label>
                <label className='form_creation_label' name='description' >Description:
                    <textarea name="description" className='inputForCreation' cols="30" rows="5" placeholder='Enter the details' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                    </label>
                <label className='form_creation_label' name='category' >Category:
                <select className='inputForCreation'
              name="category" value={category} onChange={(e)=>setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="home">Home & Garden</option>
            </select>
                    </label>
                <label className='form_creation_label' name='price' >Price:
                <input className='inputForCreation' type="text" placeholder='Enter the Price of the Product' name='price' value={price} 
                onChange={(e)=>setPrice(e.target.value)}
                ></input>
                </label>  
                <label className='form_creation_label' name='stock' >Stock:
                <input className='inputForCreation' type="text" placeholder='Enter the Stocks' name='stock'
                value={stock}
                onChange={(e)=>setStock(e.target.value)}
                ></input>
                </label>  
                <label className='form_creation_label' name='duration' >Duration:<div className='durationInput'>
                <input className='inputForCreation2' type="text"  name='duration' min={'1'} max={'12'} value={duration}
                onChange={(e)=>setDuration(e.target.value)}
                ></input>
                <select className='inputForCreationoption' name="duration" value={durationUnit} onChange={(e)=>setDurationUnit(e.target.value)}>
                <option value="">Select a duration</option>
              <option value="months">Months</option>
              <option value="year">years</option>
                </select></div>
                </label>  
                <label className='form_creation_label' name='image' >Image:
                <input className='inputForCreation' type="file" accept='image/*'  name='image' onChange={(e)=>setImages(e.target.files[0])}></input>
                </label>
                <div className="error_message">{error}</div>
                <button className='creationSubmit' type='submit'>Create</button>
            </form>
        </div>
        <img className='imgofnature' src="./pcwithnature.png" alt="nature"  height="600px" width="600px"/>
        </div></div>
    </div>
  )
}

export default Create