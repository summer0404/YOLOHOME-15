import axios from 'axios';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: '/api', // Proxied to http://localhost:3000
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = async (username, password) => {
  try {
    await api.post('/auth/signup', { username, password });
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    const { accessToken } = response.data;
    localStorage.setItem('token', accessToken); // Store the token
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const getDailyAverages = async () => {
  try {
    const response = await api.get('/temperature/daily-averages');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch daily averages');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};