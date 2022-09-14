import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import * as shipmentsAPI from '@api/shipments/methods';

const { createShipment: createShipmentAPI, updateShipment: updateShipmentAPI } =
  shipmentsAPI;

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
      await updateShipmentAPI(
        shipmentId,
        {
          ...data,
          shipmentAt: !Number.isNaN(Date.parse(data.shipmentAt))
            ? data.shipmentAt
            : null,
        },
        cookies.token
      );

      onFinish && onFinish();
    } catch (error) {
      console.log(error);
    }
  };

  return { createShipment, updateShipment };
}
