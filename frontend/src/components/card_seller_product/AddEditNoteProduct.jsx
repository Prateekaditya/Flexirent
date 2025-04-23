import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MdClose } from 'react-icons/md'

const AddEditNoteProduct = ({ note, onClose, onSave }) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [duration, setDuration] = useState('')
    const [stock, setStock] = useState('')
    const [error, setError] = useState(null)
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';
    useEffect(() => {
        if (note) {
            setName(note.name || '')
            setDescription(note.description || '')
            setCategory(note.category || '')
            setPrice(note.price || '')
            setDuration(note.duration || '')
            setStock(note.stock || '')
        }
    }, [note])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const productData = {
                name,
                description,
                category,
                price: parseFloat(price),
                duration,
                stock: parseInt(stock)
            }

            const authToken = localStorage.getItem('token')
            const response = await axios.patch(`${API_URL}/products/${note._id}`, 
                productData,
                {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            // Ensure we pass the full updated product back to the parent
            onSave(response.data.data)
            onClose()
        } catch(err) {
            setError(err.response?.data?.message || err.message)
            console.error("Error updating product:", err)
        }
    }
 
    return (
        <div className="mainEditBody">
            <div className='editBoxTitle'>
                <h2>Edit Product</h2>
                <button onClick={onClose}>
                    <MdClose />
                </button>
            </div>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div className="bodytoalign">
                <form className='formofEdit' onSubmit={handleSubmit}>
                    <div>
                        <label>
                            <span>Name:</span>
                            <input 
                                type="text" 
                                placeholder='Enter the Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Description:</span>
                            <textarea 
                                placeholder='Enter the description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30" 
                                rows="5"
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Category:</span>
                            <input 
                                type="text" 
                                placeholder='Enter the category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Price:</span>
                            <input 
                                type="number" 
                                placeholder='Enter the price'  
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Duration:</span>
                            <input 
                                type="text" 
                                placeholder='Enter the duration'
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Stock:</span>
                            <input 
                                type="number" 
                                placeholder='Enter the stock'
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <button type='submit'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default AddEditNoteProduct
