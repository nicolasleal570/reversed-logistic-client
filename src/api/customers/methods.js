import { axios, bearerToken } from '../config';
import {
  CUSTOMERS_URL,
  CUSTOMERS_LOCATION_BY_CUSTOMER_ID_URL,
  CUSTOMER_URL,
  CUSTOMERS_LOCATIONS_URL,
} from './endpoints';

export const fetchCustomers = (token) =>
  axios.get(CUSTOMERS_URL, { headers: bearerToken(token) });

export const createCustomer = (data, token) =>
  axios.post(CUSTOMERS_LOCATIONS_URL, data, { headers: bearerToken(token) });

export const fetchCustomer = (customerId, token) =>
  axios.get(CUSTOMER_URL(customerId), { headers: bearerToken(token) });

export const updateCustomer = (customerId, data, token) =>
  axios.patch(`${CUSTOMERS_LOCATIONS_URL}/${customerId}`, data, {
    headers: bearerToken(token),
  });

export const fetchCustomerLocationsByCustomer = (customerId, token) =>
  axios.get(CUSTOMERS_LOCATION_BY_CUSTOMER_ID_URL(customerId), {
    headers: bearerToken(token),
  });
