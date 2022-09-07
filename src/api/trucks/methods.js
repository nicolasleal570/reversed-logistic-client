import { axios, bearerToken } from '../config';
import {
  TRUCKS_URL,
  TRUCK_URL,
} from './endpoints';

export const fetchTrucks = (token) =>
  axios.get(TRUCKS_URL, { headers: bearerToken(token) });

export const createTruck = (data, token) =>
  axios.post(TRUCKS_URL, data, { headers: bearerToken(token) });

export const updateTruck = (truckId, data, token) =>
  axios.patch(TRUCK_URL(truckId), data, { headers: bearerToken(token) });

export const fetchTruck = (truckId, token) =>
  axios.get(TRUCK_URL(truckId), { headers: bearerToken(token) });
