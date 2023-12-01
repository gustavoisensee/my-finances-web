import axios from 'axios';
import { getSession } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const authToken = await getSession();

    console.log(API_URL)

    config.headers.Authorization = authToken?.api_token;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;