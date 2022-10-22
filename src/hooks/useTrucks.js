import { useRouter } from 'next/router';
import * as trucksApi from '@api/trucks/methods';
import { useNotify } from './useNotify';

const { createTruck: createTruckAPI, updateTruck: updateTruckAPI } = trucksApi;

export function useTrucks() {
  const router = useRouter();
  const { asyncNotify } = useNotify();

  const createTruck = async (data, token) => {
    try {
      const res = await asyncNotify(createTruckAPI(data, token), {
        pending: 'Creando el transporte...',
        success: 'Se creó correctamente',
        error:
          'Tuvimos problemas con la creación del transporte. Intenta de nuevo.',
      });

      router.push(`/trucks/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTruck = async (truckId, data, token) => {
    try {
      return asyncNotify(updateTruckAPI(truckId, data, token), {
        pending: 'Actualizando el transporte...',
        success: 'Se actualizó correctamente',
        error:
          'Tuvimos problemas actualizando el transporte. Intenta de nuevo.',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { createTruck, updateTruck };
}
