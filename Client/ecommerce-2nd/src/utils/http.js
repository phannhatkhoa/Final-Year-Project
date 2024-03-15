import axios from 'axios';

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:5000/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Add a request interceptor
    this.instance.interceptors.request.use(function (config) {
      console.log('config', config);
      if(config.url === '/auth/signin' || config.url === '/auth/signup') {
        delete config.headers.Authorization;
      
      }
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    // Add a response interceptor
    this.instance.interceptors.response.use(function (response) {
      console.log(response)
      alert(response.data?.message)
    }, function (error) {
      return Promise.reject(error);
    });
  }
}

const httpConnection = new Http().instance;

export default httpConnection;
