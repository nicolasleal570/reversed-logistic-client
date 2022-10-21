import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import * as ordersAPI from '@api/orders/methods';
import { useNotify } from './useNotify';

const {
  createOrder: createOrderAPI,
  updateOrder: updateOrderAPI,
  takeOrder: takeOrderAPI,
  markOrderAsReady: markOrderAsReadyAPI,
  assignShipmentToOrder: assignShipmentToOrderAPI,
} = ordersAPI;

export function useOrders() {
  const router = useRouter();
  const [cookies] = useCookies(['token']);
  const { asyncNotify } = useNotify();

  const createOrder = async (data, token) => {
    const { items, customerLocationId } = data;

    try {
      const res = await asyncNotify(
        createOrderAPI(
          {
            customerLocationId,
            items: items.map((info) => ({
              caseId: Number.parseInt(info.caseId, 10),
              caseContentId: Number.parseInt(info.caseContentId, 10),
              quantity: Number.parseInt(info.contentQuantity, 10) ?? 1,
            })),
          },
          token
        ),
        {
          pending: 'Creando la órden...',
          success: 'Se creó correctamente.',
          error: 'Tuvimos problemas creando la órden. Intenta de nuevo.',
        }
      );

      router.push(`/orders/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrder = async (orderId, data, token) => {
    const { items, customerLocationId } = data;

    try {
      return asyncNotify(
        updateOrderAPI(
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
        ),
        {
          pending: 'Actualizando la órden...',
          success: 'Se actualizó correctamente.',
          error: 'Tuvimos problemas actualizando la órden. Intenta de nuevo.',
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const takeOrder = async (orderId) => {
    try {
      return asyncNotify(
        takeOrderAPI(
          {
            orderId,
          },
          cookies.token
        ),
        {
          pending: 'Tomando la órden...',
          success: 'Órden asignada con éxito.',
          error: 'Tuvimos problemas asignando la órden. Intenta de nuevo.',
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const markOrderAsReady = async (orderId) => {
    try {
      return asyncNotify(
        markOrderAsReadyAPI(
          {
            orderId,
          },
          cookies.token
        ),
        {
          pending: 'Finalizando la preparación...',
          success: 'Preparación finalizada con éxito.',
          error:
            'Tuvimos problemas al completar la preparación. Intenta de nuevo.',
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const assignShipmentToOrder = async (data) => {
    try {
      return asyncNotify(assignShipmentToOrderAPI(data, cookies.token), {
        pending: 'Asignando un envío...',
        success: 'Envío asignado con éxito.',
        error:
          'Tuvimos problemas al asignar el envío a la órden. Intenta de nuevo.',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createOrder,
    updateOrder,
    takeOrder,
    markOrderAsReady,
    assignShipmentToOrder,
  };
}
