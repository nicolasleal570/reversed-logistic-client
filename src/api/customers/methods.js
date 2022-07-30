import { axios, bearerToken } from '../config';
import {
  CUSTOMERS_URL,
  CUSTOMERS_LOCATION_BY_CUSTOMER_ID_URL,
} from './endpoints';

export const fetchCustomers = (token) =>
  axios.get(CUSTOMERS_URL, { headers: bearerToken(token) });

export const fetchCustomerLocationsByCustomer = (customerId, token) =>
  axios.get(CUSTOMERS_LOCATION_BY_CUSTOMER_ID_URL(customerId), {
    headers: bearerToken(token),
  });
