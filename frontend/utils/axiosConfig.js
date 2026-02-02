import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/', // Your Django URL
});

// This "Interceptor" runs before every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // For SimpleJWT, use 'Bearer'
      // For DRF TokenAuth, use 'Token'
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;