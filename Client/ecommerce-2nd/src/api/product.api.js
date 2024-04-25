import httpConnection from "../utils/http";

export const getProductAPI = async () => {
  try {
    const response = await httpConnection.get('/product/getAll');
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductByIdAPI = async (id) => {
  try {
    const response = await httpConnection.get(`/product/getProduct/${id}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const commentProductAPI = async (body) => {
  try {
    const response = await httpConnection.post('/product/comment', body);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCommentProductAPI = async (id) => {
  try {
    const response = await httpConnection.get(`/product/getComments/${id}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const deleteCommentAPI = async (body) => {
  console.log(body);
  try {
    const response = await httpConnection.delete('/product/deleteComment', { data: body });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
