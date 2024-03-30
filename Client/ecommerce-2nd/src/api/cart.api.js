import httpConnection from "../utils/http";

export const getCartAPI = async () => {
    try {
        const response = await httpConnection.get('/cart/getCart');
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};