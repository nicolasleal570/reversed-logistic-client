import { axios, bearerToken } from '../config';
import { USERS_URL, USER_URL } from './endpoints';

export const fetchUsers = (token) =>
  axios.get(USERS_URL, { headers: bearerToken(token) });

export const fetchUser = (id, token) =>
  axios.get(USER_URL(id), { headers: bearerToken(token) });

export const createUser = (data, token) =>
  axios.post(USERS_URL, data, { headers: bearerToken(token) });
