import { useCookies } from 'react-cookie';
import * as cleanProcessAPI from '@api/clean-process-order/methods';

export function useCleanProcess() {
  const [cookies] = useCookies();

  const createCleanProcess = async (data) => {
    try {
      return cleanProcessAPI.createCleanProcessOrderFull(data, cookies.token);
    } catch (error) {
      console.log(error);
    }
  };

  const startCleanProcess = async (id) => {
    try {
      return cleanProcessAPI.startCleanProcessOrder(id, cookies.token);
    } catch (error) {
      console.log(error);
    }
  };

  const setStepDoneCleanProcess = async (id, data) => {
    try {
      return cleanProcessAPI.setStepDoneCleanProcess(id, data, cookies.token);
    } catch (error) {
      console.log(error);
    }
  };

  const doneCleanProcess = async (id) => {
    try {
      return cleanProcessAPI.doneCleanProcessOrder(id, cookies.token);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createCleanProcess,
    startCleanProcess,
    setStepDoneCleanProcess,
    doneCleanProcess,
  };
}
