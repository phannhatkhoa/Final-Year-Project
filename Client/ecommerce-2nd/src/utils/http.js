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
    this.instance.interceptors.request.use(
      function (config) {
        if (config.url === '/auth/signin' || config.url === '/auth/signup') {
          return config;
        }
        // Get token from localStorage and attach to headers if exists
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    this.instance.interceptors.response.use(
      function (response) {
        // Save token to localStorage if exists in response
        if (response.data && response.data.token) {
          const token = response.data.token;
          localStorage.setItem('token', token);
        }
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }
}

const httpConnection = new Http().instance;

export default httpConnection;
