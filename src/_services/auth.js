import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; 

// 1. Fungsi Login
export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 2. Fungsi Register
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 3. Fungsi Logout
export const logout = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_info');
    
    return response.data;
  } catch (error) {
    throw error;
  }
};