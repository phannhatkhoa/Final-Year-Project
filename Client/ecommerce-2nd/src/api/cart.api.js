import httpConnection from "../utils/http";

export const getCartAPI = async (user_id) => {
    try {
        const response = await httpConnection.get(`/cart/getCart/${user_id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const addToCartAPI = async (body) => {
    try {
        const response = await httpConnection.post('/cart/addToCart', body);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};