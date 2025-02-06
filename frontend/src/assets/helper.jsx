import axios from 'axios';

const API_URL = 'http://localhost:5555/cart';

const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    if(!token) {
        throw new Error('No authentication token found');
    }
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
};

export const addToCart = async (userId, productId, vendorId, quantity) => {
    try {
        const response = await axios.post(
            `${API_URL}/add`,
            { userId, productId, vendorId, quantity }, // ✅ Ensure vendorId is included
            getAuthConfig()
        );
        return response;
    } catch (error) {
        throw error;
    }
};


export const getCart = async (userId) => {
    try {
        const response = await axios.get(
            `${API_URL}/${userId}`,
            getAuthConfig()
        );
        return response;
    } catch(error) {
        throw error;
    }
};

export const updateCart = async (userId, productId, quantity) => {
    try {
        const response = await axios.put(
            `${API_URL}/update`,
            {userId, productId, quantity},
            getAuthConfig()
        );
        return response;
    } catch(error) {
        throw error;
    }
};

export const removeFromCart = async (userId, productId) => {
    try {
        const response = await axios.delete(
            `${API_URL}/remove`,
            {
                data: {userId, productId},
                ...getAuthConfig()
            }
        );
        return response;
    } catch(error) {
        throw error;
    }
};
