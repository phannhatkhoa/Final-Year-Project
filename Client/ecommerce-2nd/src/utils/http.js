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
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    // Add a response interceptor
    this.instance.interceptors.response.use(function (response) {
      console.log(response.data?.message);
      alert(response.data?.message)
    }, function (error) {
      // Any status codes that fall outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    });
  }
}

const httpConnection = new Http().instance;

export default httpConnection;
