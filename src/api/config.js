import Axios from 'axios';

const contentType = 'application/json';

export const axios = Axios.create({
  headers: {
    'Content-Type': contentType,
  },
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { api: process.env.NEXT_PUBLIC_API_KEY },
});

export const bearerToken = (token) => ({ Authorization: `Bearer ${token}` });
