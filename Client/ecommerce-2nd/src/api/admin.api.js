import httpConnection from "../utils/http";

export const getAllUserAPI = async () => {
    try {
        const response = await httpConnection.get('/admin/getUser');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserRoleAPI = async (id, body) => {
    try {
        const response = await httpConnection.put(`/admin/updateUserRole/${id}`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
}