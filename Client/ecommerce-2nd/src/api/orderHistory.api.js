import httpConnection from "../utils/http";

export const createOrderHistoryAPI = async (body) => {
    try {
        const response = await httpConnection.post('/orderHistory/create', body);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getOrderHistoryAPI = async (user_id) => {
    try {
        const response = await httpConnection.get(`/orderHistory/getOrderHistoryByUserId/${user_id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}


