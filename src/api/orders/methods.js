import { axios, bearerToken } from '../config';
import { ORDERS_URL, ORDER_URL } from './endpoints';

export const fetchOrders = (token) =>
  axios.get(ORDERS_URL, { headers: bearerToken(token) });

export const fetchOrder = (orderId, token) =>
  axios.get(ORDER_URL(orderId), { headers: bearerToken(token) });

export const createOrder = (data, token) =>
  axios.post(ORDERS_URL, data, { headers: bearerToken(token) });

export const updateOrder = (orderId, data, token) => {
  return axios.patch(ORDER_URL(orderId), data, { headers: bearerToken(token) });
};
