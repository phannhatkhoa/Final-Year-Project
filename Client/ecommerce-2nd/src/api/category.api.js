import httpConnection from "../utils/http";

export const getCategoryAPI = async () => {
    try {
        const response = await httpConnection.get("/category/getAll");
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getProductByCategoryAPI = async (id) => {
    try {
        const response = await httpConnection.get(`/category/getProduct/${id}`);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}