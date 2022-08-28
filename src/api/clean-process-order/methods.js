import { axios, bearerToken } from '../config';
import { CLEAN_PROCESS_ORDER_URL } from './endpoints';

export const fetchCleanProcessOrders = (token) =>
  axios.get(CLEAN_PROCESS_ORDER_URL, { headers: bearerToken(token) });

export const createCleanProcessOrderFull = (data, token) =>
  axios.post(`${CLEAN_PROCESS_ORDER_URL}/full`, data, {
    headers: bearerToken(token),
  });
