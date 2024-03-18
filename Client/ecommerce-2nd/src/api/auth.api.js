import httpConnection from "../utils/http"

export const RegisterAPI = (body) => {
  return httpConnection.post('/user/signup', body)
}

export const LoginAPI = (body) => {
  return httpConnection.post('/user/signin', body)
}

export const ProfileAPI = () => {
  return httpConnection.get('/user/profile')
}