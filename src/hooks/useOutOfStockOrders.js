import { useCookies } from 'react-cookie';
import * as outOfStockOrdersAPI from '@api/out-of-stock/methods';
import { useNotify } from './useNotify';

const {
  createOutOfStockOrder: createOutOfStockOrderAPI,
  updateOutOfStockOrder: updateOutOfStockOrderAPI,
  takeOutOfStockOrder: takeOutOfStockOrderAPI,
  finishOutOfStockOrder: finishOutOfStockOrderAPI,
} = outOfStockOrdersAPI;

export function useOutOfStockOrders() {
  const [cookies] = useCookies(['token']);
  const { asyncNotify } = useNotify();

  const createOutOfStockOrder = async (data) => {
    try {
      return asyncNotify(createOutOfStockOrderAPI(data, cookies.token), {
        pending: 'Creando reporte de agotamiento...',
        success: 'Se creó el reporte correctamente.',
        error: 'Tuvimos problemas creando el reporte. Intenta de nuevo.',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateOutOfStockOrder = async (id, data) => {
    try {
      return asyncNotify(updateOutOfStockOrderAPI(id, data, cookies.token), {
        pending: 'Actualizando reporte de agotamiento...',
        success: 'Se actualizó el reporte correctamente.',
        error: 'Tuvimos problemas actulizando el reporte. Intenta de nuevo.',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const takeOutOfStockOrder = async (data) => {
    try {
      return asyncNotify(takeOutOfStockOrderAPI(data, cookies.token), {
        pending: 'Comenzando con la recogida...',
        success: 'Se comenzó la recogida correctamente.',
        error: 'Tuvimos problemas comenzando la recogida. Intenta de nuevo.',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const finishOutOfStockOrder = async (data) => {
    try {
      return asyncNotify(finishOutOfStockOrderAPI(data, cookies.token), {
        pending: 'Entregando la recogida...',
        success: 'Se entregó todo correctamente.',
        error: 'Tuvimos problemas haciendo la entrega. Intenta de nuevo.',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createOutOfStockOrder,
    updateOutOfStockOrder,
    takeOutOfStockOrder,
    finishOutOfStockOrder,
  };
}
