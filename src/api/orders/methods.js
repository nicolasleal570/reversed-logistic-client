import { axios, bearerToken } from '../config';
import {
  ASSIGN_SHIPMENT_ORDER_URL,
  DONE_ORDER_URL,
  ORDERS_URL,
  ORDER_STATUS,
  ORDER_URL,
  TAKE_ORDER_URL,
} from './endpoints';

export const fetchOrders = (token) =>
  axios.get(ORDERS_URL, { headers: bearerToken(token) });

export const fetchOrder = (orderId, token) =>
  axios.get(ORDER_URL(orderId), { headers: bearerToken(token) });

export const fetchOrderStatus = (token) =>
  axios.get(ORDER_STATUS, { headers: bearerToken(token) });

export const createOrder = (data, token) =>
  axios.post(ORDERS_URL, data, { headers: bearerToken(token) });

export const updateOrder = (orderId, data, token) => {
  return axios.patch(ORDER_URL(orderId), data, { headers: bearerToken(token) });
};

export const takeOrder = (data, token) => {
  return axios.post(TAKE_ORDER_URL, data, { headers: bearerToken(token) });
};

export const markOrderAsReady = (data, token) => {
  return axios.post(DONE_ORDER_URL, data, { headers: bearerToken(token) });
};

export const assignShipmentToOrder = (data, token) => {
  return axios.post(ASSIGN_SHIPMENT_ORDER_URL, data, {
    headers: bearerToken(token),
  });
};
