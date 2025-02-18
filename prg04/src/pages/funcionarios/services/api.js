import axios from 'axios';

const api = axios.create({
  baseURL: '', // Substitua pela URL do seu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
