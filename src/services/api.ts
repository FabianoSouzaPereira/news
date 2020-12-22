import axios from 'axios';

interface tipos {
  username: string;
  data: string;
  params: {
    email: string;
  };
}

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export default api;
