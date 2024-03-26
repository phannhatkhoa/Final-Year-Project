import httpConnection from "../utils/http";

export const getProductAPI = async () => {
  try {
    const response = await httpConnection.get('/product/getAll');
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductByIdAPI = (id) => {
  return httpConnection.get(`/product/getProduct/${id}`);
}
