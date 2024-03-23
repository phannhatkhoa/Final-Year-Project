import httpConnection from "../utils/http"

export const RegisterAPI = (body) => {
  return httpConnection.post('/user/signup', body)
}

export const LoginAPI = (body) => {
  return httpConnection.post('/user/signin', body)
}

export const ProfileAPI = (id) =>{
  return httpConnection.get(`/user/profile/${id}`)
}

export const UpdateProfileAPI = async (id, body) => {
  try {
    const response = await httpConnection.put(`/user/profile/${id}`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};