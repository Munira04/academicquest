import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // allows cookies (refresh token) to be sent
});

export default api;