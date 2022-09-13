import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import * as ordersAPI from '@api/orders/methods';

const {
  createOrder: createOrderAPI,
  updateOrder: updateOrderAPI,
  takeOrder: takeOrderAPI,
  markOrderAsReady: markOrderAsReadyAPI,
} = ordersAPI;

export function useOrders() {
  const router = useRouter();
  const [cookies] = useCookies(['token']);

  const createOrder = async (data, token) => {
    const { items, customerLocationId } = data;

    try {
      const res = await createOrderAPI(
        {
          customerLocationId,
          items: items.map((info) => ({
            caseId: Number.parseInt(info.caseId, 10),
            caseContentId: Number.parseInt(info.caseContentId, 10),
            quantity: Number.parseInt(info.contentQuantity, 10) ?? 1,
          })),
        },
        token
      );

      router.push(`/orders/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrder = async (orderId, data, token, onFinish) => {
    const { items, customerLocationId } = data;

    try {
      await updateOrderAPI(
        orderId,
        {
          customerLocationId,
          items: items.map((info) => ({
            id: info.id,
            caseId: Number.parseInt(info.caseId, 10),
            caseContentId: Number.parseInt(info.caseContentId, 10),
            quantity: Number.parseInt(info.contentQuantity, 10) ?? 1,
          })),
        },
        token
      );

      onFinish && onFinish();
    } catch (error) {
      console.log(error);
    }
  };

  const takeOrder = async (orderId) => {
    try {
      return takeOrderAPI(
        {
          orderId,
        },
        cookies.token
      );
    } catch (error) {
      console.log(error);
    }
  };

  const markOrderAsReady = async (orderId) => {
    try {
      return markOrderAsReadyAPI(
        {
          orderId,
        },
        cookies.token
      );
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createOrder,
    updateOrder,
    takeOrder,
    markOrderAsReady,
  };
}
