import httpConnection from "../utils/http"

export const getAllBrandAPI = async () => {
    try {
        const response = await httpConnection.get('/brand/getBrand');
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}