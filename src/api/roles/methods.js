import { axios, bearerToken } from '../config';
import { ROLES_URL, ROLE_URL } from './endpoints';

export const fetchRoles = (token) =>
  axios.get(ROLES_URL, { headers: bearerToken(token) });

export const fetchRole = (id, token) =>
  axios.get(ROLE_URL(id), { headers: bearerToken(token) });

export const createRole = (data, token) =>
  axios.post(ROLES_URL, data, { headers: bearerToken(token) });

export const updateRole = (id, data, token) =>
  axios.patch(ROLE_URL(id), data, { headers: bearerToken(token) });
