import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import * as shipmentsAPI from '@api/shipments/methods';
import { useNotify } from './useNotify';

const {
  createShipment: createShipmentAPI,
  updateShipment: updateShipmentAPI,
  startShipment: startShipmentAPI,
} = shipmentsAPI;

export function useShipments() {
  const router = useRouter();
  const [cookies] = useCookies(['token']);
  const { asyncNotify } = useNotify();

  const createShipment = async (data) => {
    try {
      const res = await asyncNotify(
        createShipmentAPI(
          {
            ...data,
            shipmentAt: !Number.isNaN(Date.parse(data.shipmentAt))
              ? data.shipmentAt
              : null,
          },
          cookies.token
        ),
        {
          pending: 'Creando una órden de envío...',
          success: 'Se creó correctamente.',
          error:
            'Tuvimos problemas con la creación de la órden de envío. Intenta de nuevo.',
        }
      );

      router.push(`/shipments/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateShipment = async (shipmentId, data) => {
    try {
      const { shipmentAt: date, ...rest } = data;
      const payload = {
        shipmentAt: Number.isNaN(new Date(date).getTime()) ? null : date,
        ...rest,
      };

      return asyncNotify(
        updateShipmentAPI(shipmentId, payload, cookies.token),
        {
          pending: 'Actualizando la órden de envío...',
          success: 'Se actualizó correctamente.',
          error:
            'Tuvimos problemas actualizando la órden de envío. Intenta de nuevo.',
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const startShipment = async (data) => {
    try {
      return asyncNotify(startShipmentAPI(data, cookies.token), {
        pending: 'Comenzando con el envío...',
        success: 'El envío comenzó correctamente.',
        error: 'Tuvimos problemas comenzando el envío. Intenta de nuevo.',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deliverShipment = async (id) => {
    try {
      return asyncNotify(
        updateShipment(id, {
          deliveredAt: new Date(),
        }),
        {
          pending: 'Entregando el envío...',
          success: 'El envío se entregó correctamente.',
          error: 'Tuvimos problemas entregando el envío. Intenta de nuevo.',
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return { createShipment, updateShipment, startShipment, deliverShipment };
}
