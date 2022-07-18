import { axios, bearerToken } from './config';
import { LOGIN_URL, CURRENT_USER_URL, USERS_URL, ROLES_URL } from './endpoints';

export const fetchLogin = (data) => axios.post(`${LOGIN_URL}`, data);

export const fetchCurrentUser = (token) =>
  axios.get(`${CURRENT_USER_URL}`, { headers: bearerToken(token) });

export const fetchUsers = (token) =>
  axios.get(USERS_URL, { headers: bearerToken(token) });

export const createUser = (data, token) =>
  axios.post(USERS_URL, data, { headers: bearerToken(token) });

export const fetchRoles = (token) =>
  axios.get(ROLES_URL, { headers: bearerToken(token) });
