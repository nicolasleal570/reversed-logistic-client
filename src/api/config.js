import Axios from 'axios';

const contentType = 'application/json';

export const axios = Axios.create({
  headers: {
    'Content-Type': contentType,
    api: process.env.NEXT_PUBLIC_API_KEY,
  },
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const bearerToken = (token) => ({ Authorization: `Bearer ${token}` });
