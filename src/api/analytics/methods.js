import { axios, bearerToken } from '../config';
import { ANALYTICS_URL } from './endpoints';

export const fetchBestCustomers = (token, params = {}) =>
  axios.get(
    `${ANALYTICS_URL}/best-customers?${new URLSearchParams({
      ...params,
    }).toString()}`,
    {
      headers: bearerToken(token),
    }
  );

export const fetchBestCustomersLocation = (token, params = {}) =>
  axios.get(
    `${ANALYTICS_URL}/best-customers-location?${new URLSearchParams({
      ...params,
    }).toString()}`,
    {
      headers: bearerToken(token),
    }
  );

export const fetchBestCaseContents = (token, params = {}) =>
  axios.get(
    `${ANALYTICS_URL}/best-case-contents?${new URLSearchParams({
      ...params,
    }).toString()}`,
    {
      headers: bearerToken(token),
    }
  );

export const fetchBestCases = (token, params = {}) =>
  axios.get(
    `${ANALYTICS_URL}/best-cases?${new URLSearchParams({
      ...params,
    }).toString()}`,
    {
      headers: bearerToken(token),
    }
  );

export const fetchDeliveryAtTime = (token, params = {}) =>
  axios.get(
    `${ANALYTICS_URL}/delivery-at-time?${new URLSearchParams({
      ...params,
    }).toString()}`,
    {
      headers: bearerToken(token),
    }
  );

export const fetchShipmentsCount = (token, params = {}) =>
  axios.get(
    `${ANALYTICS_URL}/shipments-count?${new URLSearchParams({
      ...params,
    }).toString()}`,
    {
      headers: bearerToken(token),
    }
  );

export const fetchLateDeliveries = (token, params = {}) =>
  axios.get(
    `${ANALYTICS_URL}/late-deliveries?${new URLSearchParams({
      ...params,
    }).toString()}`,
    {
      headers: bearerToken(token),
    }
  );

export const fetchInventoryTurnover = (token, params = {}) =>
  axios.get(
    `${ANALYTICS_URL}/inventory-turnover?${new URLSearchParams({
      ...params,
    }).toString()}`,
    {
      headers: bearerToken(token),
    }
  );

export const fetchStockRotation = (token, params = {}) =>
  axios.get(
    `${ANALYTICS_URL}/stock-rotation?${new URLSearchParams({
      ...params,
    }).toString()}`,
    {
      headers: bearerToken(token),
    }
  );
