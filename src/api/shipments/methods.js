import { axios, bearerToken } from '../config';
import { SHIPMENTS_URL, SHIPMENT_URL } from './endpoints';

export const fetchShipments = (token, params = {}) =>
  axios.get(`${SHIPMENTS_URL}`, { params, headers: bearerToken(token) });

export const fetchShipment = (id, token) =>
  axios.get(`${SHIPMENT_URL(id)}`, { headers: bearerToken(token) });

export const createShipment = (data, token) =>
  axios.post(`${SHIPMENTS_URL}`, data, { headers: bearerToken(token) });

export const updateShipment = (id, data, token) =>
  axios.patch(`${SHIPMENT_URL(id)}`, data, { headers: bearerToken(token) });
