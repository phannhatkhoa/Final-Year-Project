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

export const deleteProductAPI = async (id) => {
    try {
        const response = await httpConnection.delete(`/admin/deleteProduct/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editProductAPI = async (id, body) => {
    try {
        const response = await httpConnection.put(`/admin/updateProduct/${id}`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getOrderHistoryAdminAPI = async () => {
    try {
        const response = await httpConnection.get('/orderHistory/getAllOrderHistory');
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const updateOrderStatusAPI = async (id, orderStatus) => {
    try {
        const response = await httpConnection.put(`/admin/updateOrderStatus`, { id, order_status: orderStatus });
        return response.data;
    } catch (error) {
        throw error;
    }
};

