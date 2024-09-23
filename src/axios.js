import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost', // Replace with your Laravel API base URL
  withCredentials: true, // Important for including credentials in requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  console.log('Request headers:', config.headers); // Debugging

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;