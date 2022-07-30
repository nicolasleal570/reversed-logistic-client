import { axios, bearerToken } from '../config';
import { ROLES_URL } from './endpoints';

export const fetchRoles = (token) =>
  axios.get(ROLES_URL, { headers: bearerToken(token) });
