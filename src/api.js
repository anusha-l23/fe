import axios from 'axios';
import { useParams } from 'react-router-dom';

const instance = axios.create({
  baseURL: 'http://localhost:3002/users',
});

const api = {

  signUp: async (data) => {
    try {
      const response = await instance.post('/register', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (data) => {
    try {
      const response = await instance.post('/login', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  forgotPassword: async (data) => {
    try {
     
      const response = await instance.post('/forgot-password', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  resetPassword: async (code, data) => {
    try {

      const response = await instance.post(`/reset-password/${code}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Add more API functions here
};

export default api;