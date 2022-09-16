import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import * as shipmentsAPI from '@api/shipments/methods';

const {
  createShipment: createShipmentAPI,
  updateShipment: updateShipmentAPI,
  startShipment: startShipmentAPI,
} = shipmentsAPI;

export function useShipments() {
  const router = useRouter();
  const [cookies] = useCookies(['token']);

  const createShipment = async (data) => {
    try {
      const res = await createShipmentAPI(
        {
          ...data,
          shipmentAt: !Number.isNaN(Date.parse(data.shipmentAt))
            ? data.shipmentAt
            : null,
        },
        cookies.token
      );

      router.push(`/shipments/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateShipment = async (shipmentId, data, onFinish) => {
    try {
      await updateShipmentAPI(shipmentId, data, cookies.token);

      onFinish && onFinish();
    } catch (error) {
      console.log(error);
    }
  };

  const startShipment = async (data) => {
    try {
      return startShipmentAPI(data, cookies.token);
    } catch (error) {
      console.log(error);
    }
  };

  return { createShipment, updateShipment, startShipment };
}
