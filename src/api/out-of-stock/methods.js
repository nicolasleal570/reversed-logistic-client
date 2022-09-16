import { axios, bearerToken } from '../config';
import { OUT_OF_STOCK_ORDERS_URL, OUT_OF_STOCK_ORDER_URL } from './endpoints';

export const fetchOutOfStockOrders = (token, params = {}) =>
  axios.get(`${OUT_OF_STOCK_ORDERS_URL}`, {
    params,
    headers: bearerToken(token),
  });

export const fetchOutOfStockOrder = (id, token) =>
  axios.get(`${OUT_OF_STOCK_ORDER_URL(id)}`, { headers: bearerToken(token) });

export const createOutOfStockOrder = (data, token) =>
  axios.post(`${OUT_OF_STOCK_ORDERS_URL}`, data, {
    headers: bearerToken(token),
  });

export const updateOutOfStockOrder = (id, data, token) =>
  axios.patch(`${OUT_OF_STOCK_ORDER_URL(id)}`, data, {
    headers: bearerToken(token),
  });
