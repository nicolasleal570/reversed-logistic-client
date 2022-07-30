import { useRouter } from 'next/router';
import * as ordersAPI from '@api/orders/methods';

const { createOrder: createOrderAPI, updateOrder: updateOrderAPI } = ordersAPI;

export function useOrders() {
  const router = useRouter();

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
      const res = await updateOrderAPI(
        orderId,
        {
          customerLocationId,
          items: items.map((info) => {
            console.log({ info });

            return {
              id: info.id,
              caseId: Number.parseInt(info.caseId, 10),
              caseContentId: Number.parseInt(info.caseContentId, 10),
              quantity: Number.parseInt(info.contentQuantity, 10) ?? 1,
            };
          }),
        },
        token
      );

      onFinish && onFinish();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createOrder,
    updateOrder,
  };
}
