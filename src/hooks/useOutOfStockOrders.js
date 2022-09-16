import { useCookies } from 'react-cookie';
import * as outOfStockOrdersAPI from '@api/out-of-stock/methods';

const {
  createOutOfStockOrder: createcreateOutOfStockOrderAPI,
  updateOutOfStockOrder: updateOutOfStockOrderAPI,
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

  return { createOutOfStockOrder, updateOutOfStockOrder };
}
