import { axios, bearerToken } from '../config';
import { PROCESS_STEPS_URL } from './endpoints';

export const fetchProcessSteps = (token) =>
  axios.get(PROCESS_STEPS_URL, { headers: bearerToken(token) });
