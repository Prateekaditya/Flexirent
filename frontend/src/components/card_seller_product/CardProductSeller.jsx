import React, { useState } from 'react';
import axios from 'axios';
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "./cardproductseller.css";
import AddEditNoteProduct from './AddEditNoteProduct';

const CardProductSeller = ({ product, onUpdateProduct, onDeleteProduct }) => {
    const [showAddEdit, setShowAddEditProduct] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';
    const openAddEditModal = (note = null) => {
        setEditingProduct(note);
        setShowAddEditProduct(true);
    };

    const closeAddEditModal = () => {
        setShowAddEditProduct(false);
        setEditingProduct(null);
    };

    const handleSaveProduct = async (updatedProduct) => {
        try {
            if (onUpdateProduct) {
                onUpdateProduct(updatedProduct);
            }
            closeAddEditModal();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const confirmDeleteProduct = (productId) => {
        setProductToDelete(productId);
        setShowDeleteConfirm(true);
    };

    const handleDeleteProduct = async () => {
        try {
            const authToken = localStorage.getItem('token');
            await axios.delete(`${API_URL}/products/${productToDelete}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
           
            if (onDeleteProduct) {
                onDeleteProduct(productToDelete);
            }
            setShowDeleteConfirm(false);
            setProductToDelete(null);
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product. Please try again.');
            setShowDeleteConfirm(false);
        }
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setProductToDelete(null);
    };

    if (!product || product.length === 0) {
        return <div className='boxOfproduct1'>No products found</div>;
    }

    return (
        <div>
            <div className={`mainBox ${showAddEdit || showDeleteConfirm ? 'blurred' : ''}`}>
                {product.map((item) => (
                    <div key={item._id} className="boxOfproduct">
                        <div className="imgProduct">
                            <img
                                className='imgProductSeller'
                                src={`${API_URL}/uploads/${item.images}`}
                                alt={item.name}
                            />
                        </div>
                        <p className='productName'>Name: {item.name.slice(0, 40)}.....</p>
                        <div className="details">
                            <p>price: ₹{item.price}</p>
                            <p>stock: {item.stock}</p>
                        </div>
                         
                        <div className="icons">
                            <button onClick={() => openAddEditModal(item)}>
                                <MdOutlineModeEdit className='editicons'/>
                            </button>
                            <button onClick={() => confirmDeleteProduct(item._id)}>
                                <MdDelete className='deleteicon'/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
         
            {showAddEdit && (
                <AddEditNoteProduct
                    note={editingProduct}
                    onClose={closeAddEditModal}
                    onSave={handleSaveProduct}
                />
            )}

            {showDeleteConfirm && (
                <div className="delete-confirm-overlay">
                    <div className="delete-confirm-modal">
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete this product?</p>
                        <div className="delete-confirm-buttons">
                            <button 
                                className="delete-confirm-yes" 
                                onClick={handleDeleteProduct}
                            >
                                Yes
                            </button>
                            <button 
                                className="delete-confirm-no" 
                                onClick={cancelDelete}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardProductSeller;