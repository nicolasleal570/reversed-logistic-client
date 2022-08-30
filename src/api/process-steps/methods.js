import { axios, bearerToken } from '../config';
import { PROCESS_STEPS_URL, PROCESS_STEP_URL } from './endpoints';

export const fetchProcessSteps = (token) =>
  axios.get(PROCESS_STEPS_URL, { headers: bearerToken(token) });

export const fetchProcessStep = (processStepId, token) =>
  axios.get(PROCESS_STEP_URL(processStepId), { headers: bearerToken(token) });

export const createProcessStep = (data, token) =>
  axios.post(PROCESS_STEPS_URL, data, { headers: bearerToken(token) });

export const updateProcessStep = (processStepId, data, token) =>
  axios.patch(PROCESS_STEP_URL(processStepId), data, {
    headers: bearerToken(token),
  });
