import { useCookies } from 'react-cookie';
import * as outOfStockOrdersAPI from '@api/out-of-stock/methods';

const {
  createOutOfStockOrder: createcreateOutOfStockOrderAPI,
  updateOutOfStockOrder: updateOutOfStockOrderAPI,
  takeOutOfStockOrder: takeOutOfStockOrderAPI,
  finishOutOfStockOrder: finishOutOfStockOrderAPI,
} = outOfStockOrdersAPI;

export function useOutOfStockOrders() {
  const [cookies] = useCookies(['token']);

  const createOutOfStockOrder = async (data) => {
    try {
      return createcreateOutOfStockOrderAPI(data, cookies.token);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOutOfStockOrder = async (id, data) => {
    try {
      return updateOutOfStockOrderAPI(id, data, cookies.token);
    } catch (error) {
      console.log(error);
    }
  };

  const takeOutOfStockOrder = async (data) => {
    try {
      return takeOutOfStockOrderAPI(data, cookies.token);
    } catch (error) {
      console.log(error);
    }
  };

  const finishOutOfStockOrder = async (data) => {
    try {
      return finishOutOfStockOrderAPI(data, cookies.token);
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
