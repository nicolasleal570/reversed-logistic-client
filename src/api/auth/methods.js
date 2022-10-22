import { axios, bearerToken } from '../config';
import {
  LOGIN_URL,
  CURRENT_USER_URL,
  LOGOUT_USER_URL,
  RECOVERY_PASSWORD_URL,
  CHANGE_PASSWORD_URL,
} from './endpoints';

export const fetchLogin = (data) => axios.post(`${LOGIN_URL}`, data);

export const fetchCurrentUser = (token) =>
  axios.get(`${CURRENT_USER_URL}`, { headers: bearerToken(token) });

export const logoutUser = (token) =>
  axios.post(`${LOGOUT_USER_URL}`, {}, { headers: bearerToken(token) });

export const recoveryPassword = (data, token) =>
  axios.post(`${RECOVERY_PASSWORD_URL}`, data, { headers: bearerToken(token) });

export const changePassword = (data, token) =>
  axios.post(`${CHANGE_PASSWORD_URL}`, data, { headers: bearerToken(token) });
