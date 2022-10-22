import { useCookies } from 'react-cookie';
import * as cleanProcessAPI from '@api/clean-process-order/methods';
import { useNotify } from './useNotify';

export function useCleanProcess() {
  const [cookies] = useCookies();
  const { asyncNotify } = useNotify();

  const createCleanProcess = async (data) => {
    try {
      return asyncNotify(
        cleanProcessAPI.createCleanProcessOrderFull(data, cookies.token),
        {
          pending: 'Creando la órden de limpieza...',
          success: 'Órden de limpieza creada correctamente',
          error:
            'Tuvimos problemas para crear la órden de limpieza. Intenta de nuevo.',
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const startCleanProcess = async (id) => {
    try {
      return asyncNotify(
        cleanProcessAPI.startCleanProcessOrder(id, cookies.token),
        {
          pending: 'Iniciando la limpieza...',
          success: 'Limpieza iniciada correctamente',
          error:
            'Tuvimos problemas para comenzar la limpieza. Intenta de nuevo.',
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const setStepDoneCleanProcess = async (id, data) => {
    try {
      return asyncNotify(
        cleanProcessAPI.setStepDoneCleanProcess(id, data, cookies.token),
        {
          pending: 'Completando el paso...',
          success: 'Paso completado correctamente',
          error: 'Tuvimos problemas para completar el paso. Intenta de nuevo.',
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const doneCleanProcess = async (id) => {
    try {
      return asyncNotify(
        cleanProcessAPI.doneCleanProcessOrder(id, cookies.token),
        {
          pending: 'Finalizando con la limpieza...',
          success: 'Limpieza finalizada correctamente',
          error: 'Tuvimos problemas finalizando la limpieza. Intenta de nuevo.',
        }
      );
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
