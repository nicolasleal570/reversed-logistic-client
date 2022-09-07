import { useRouter } from 'next/router';
import * as trucksApi from '@api/trucks/methods';

const { createTruck: createTruckAPI, updateTruck: updateTruckAPI } = trucksApi;

export function useTrucks() {
  const router = useRouter();

  const createTruck = async (data, token) => {
    try {
      const res = await createTruckAPI(data, token);

      router.push(`/trucks/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTruck = async (truckId, data, token, onFinish) => {
    try {
      const res = await updateTruckAPI(truckId, data, token);

      onFinish && onFinish();
    } catch (error) {
      console.log(error);
    }
  };

  return { createTruck, updateTruck };
}
