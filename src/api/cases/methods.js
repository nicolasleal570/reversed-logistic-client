import { axios, bearerToken } from '../config';
import { CASES_URL, CASES_CONTENT_URL } from './endpoints';

export const fetchCases = (token) =>
  axios.get(CASES_URL, { headers: bearerToken(token) });

export const fetchCasesContent = (token) =>
  axios.get(CASES_CONTENT_URL, { headers: bearerToken(token) });
