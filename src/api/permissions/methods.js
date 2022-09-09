import { axios, bearerToken } from '../config';
import { PERMISSIONS_URL } from './endpoints';

export const fetchPermissions = (token) =>
  axios.get(PERMISSIONS_URL, { headers: bearerToken(token) });
