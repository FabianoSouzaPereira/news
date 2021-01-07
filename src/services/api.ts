import axios from 'axios';

interface tipos {
  username: string;
  data: string;
  params: {
    email: string;
  };
}

const api: any = axios.create({
  baseURL: 'http://10.0.2.2:3000',
  timeout: 5000,
  headers: { 'accept': 'application/json' }
});

export default api;
