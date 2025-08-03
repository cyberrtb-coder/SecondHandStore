import axios from 'axios';

const API = axios.create({
  baseURL: 'https://secondhandstore-backend.vercel.app', // Change if backend uses another port
});

export default API;
