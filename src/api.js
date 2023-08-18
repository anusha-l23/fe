import axios from 'axios';

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
  // Add more API functions here
};

export default api;