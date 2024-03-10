import httpConnection from "../utils/http"

export const RegisterAPI = (body) =>{
  httpConnection.post('user/register', body)
}

export const LoginAPI = (body) =>{
  httpConnection.post('user/login', body)
}