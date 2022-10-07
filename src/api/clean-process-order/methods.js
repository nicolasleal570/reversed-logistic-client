import { axios, bearerToken } from '../config';
import {
  CLEAN_PROCESS_ORDER_URL,
  CLEAN_PROCESS_ORDERS_URL,
  CLEAN_PROCESS_STATUS_URL,
} from './endpoints';

export const fetchCleanProcessOrders = (token) =>
  axios.get(CLEAN_PROCESS_ORDERS_URL, { headers: bearerToken(token) });

export const fetchCleanProcessOrderStatus = (token) =>
  axios.get(CLEAN_PROCESS_STATUS_URL, { headers: bearerToken(token) });

export const fetchCleanProcessOrder = (id, token) =>
  axios.get(CLEAN_PROCESS_ORDER_URL(id), { headers: bearerToken(token) });

export const createCleanProcessOrderFull = (data, token) =>
  axios.post(`${CLEAN_PROCESS_ORDERS_URL}/full`, data, {
    headers: bearerToken(token),
  });

export const startCleanProcessOrder = (id, token) =>
  axios.post(
    `${CLEAN_PROCESS_ORDER_URL(id)}/start`,
    {},
    {
      headers: bearerToken(token),
    }
  );

export const setStepDoneCleanProcess = (id, data, token) =>
  axios.post(`${CLEAN_PROCESS_ORDER_URL(id)}/step-done`, data, {
    headers: bearerToken(token),
  });

export const doneCleanProcessOrder = (id, token) =>
  axios.post(
    `${CLEAN_PROCESS_ORDER_URL(id)}/finished`,
    {},
    {
      headers: bearerToken(token),
    }
  );
