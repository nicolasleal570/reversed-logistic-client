import { axios, bearerToken } from '../config';
import { ANALYTICS_URL } from './endpoints';

export const fetchOrdersByCustomerLocations = (customerId, token) =>
  axios.post(
    `${ANALYTICS_URL}/orders-by-customer-locations`,
    { customerId },
    { headers: bearerToken(token) }
  );

export const fetchBestCustomers = (token) =>
  axios.get(`${ANALYTICS_URL}/best-customers`, { headers: bearerToken(token) });

export const fetchBestCaseContents = (token) =>
  axios.get(`${ANALYTICS_URL}/best-case-contents`, {
    headers: bearerToken(token),
  });

export const fetchBestCases = (token) =>
  axios.get(`${ANALYTICS_URL}/best-cases`, {
    headers: bearerToken(token),
  });