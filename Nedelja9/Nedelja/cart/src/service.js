import axios from 'axios';

export const getAllProducts = () => {
    return axios.get(`http://localhost:3005/products`);
}

export const addNewProduct = (product) => {
    return axios.post(`http://localhost:3005/products`, product);
}

export const changeQuantity = (id, quantity) => {
    return axios.patch(`http://localhost:3005/products/${id}`, {quantity});
}