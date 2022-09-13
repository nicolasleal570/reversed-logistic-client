import { axios, bearerToken } from '../config';
import {
  CASES_URL,
  CASES_CONTENT_URL,
  CASE_URL,
  CASE_CONTENT_URL,
} from './endpoints';

export const fetchCases = (token, params = {}) =>
  axios.get(CASES_URL, { params, headers: bearerToken(token) });

export const createCase = (data, token) =>
  axios.post(CASES_URL, data, { headers: bearerToken(token) });

export const updateCase = (caseId, data, token) =>
  axios.patch(CASE_URL(caseId), data, { headers: bearerToken(token) });

export const fetchCase = (caseId, token) =>
  axios.get(CASE_URL(caseId), { headers: bearerToken(token) });

export const fetchCasesContent = (token) =>
  axios.get(CASES_CONTENT_URL, { headers: bearerToken(token) });

export const createCaseContent = (data, token) =>
  axios.post(CASES_CONTENT_URL, data, { headers: bearerToken(token) });

export const fetchCaseContent = (caseContentId, token) =>
  axios.get(CASE_CONTENT_URL(caseContentId), { headers: bearerToken(token) });

export const updateCaseContent = (caseContentId, data, token) =>
  axios.patch(CASE_CONTENT_URL(caseContentId), data, {
    headers: bearerToken(token),
  });
