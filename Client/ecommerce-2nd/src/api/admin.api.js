import httpConnection from "../utils/http";

export const getAllUserAPI = async () => {
    try {
        const response = await httpConnection.get('/admin/getUser');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserRoleAPI = async (id, newRole) => {
    try {
        const response = await httpConnection.put(`/admin/updateRole/${id}`, { role: newRole });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getAllProductAPI = async () => {
    try {
        const response = await httpConnection.get('/admin/getProducts');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUserAPI = async (id) => {
    try {
        const response = await httpConnection.delete(`/admin/deleteUser/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addProductAPI = async (body) => {
    try {
        const response = await httpConnection.post('/admin/addProduct', body);
        return response.data;
    } catch (error) {
        throw error;
    }
}