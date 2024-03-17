import httpConnection from "../utils/http"

export const RegisterAPI = (body) =>{
  httpConnection.post('/user/signup', body)
}

export const LoginAPI = (body) =>{
  httpConnection.post('/user/signin', body)
}

export const ProfileAPI = () =>{
  httpConnection.get('/user/profile')
}