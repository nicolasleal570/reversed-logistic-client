import { axios, bearerToken } from './config';
import { REGISTER_URL, LOGIN_URL, CURRENT_USER_URL } from './endpoints';

export const fetchRegister = (data) => axios.post(REGISTER_URL, data);

export const fetchLogin = (data) => axios.post(`${LOGIN_URL}`, data);

export const fetchCurrentUser = (token) =>
  axios.get(`${CURRENT_USER_URL}`, { headers: bearerToken(token) });
