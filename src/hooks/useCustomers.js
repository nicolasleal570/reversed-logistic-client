import { useRouter } from 'next/router';
import * as customersAPI from '@api/customers/methods';

const { createCustomer: createCustomerAPI, updateCustomer: updateCustomerAPI } =
  customersAPI;

export function useCustomers() {
  const router = useRouter();

  const createCustomer = async (data, token) => {
    const { locations, ...rest } = data;

    try {
      const res = await createCustomerAPI(
        {
          ...rest,
          locations,
        },
        token
      );

      router.push(`/customers/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCustomer = async (customerId, data, token, onFinish) => {
    const { locations, ...rest } = data;

    try {
      await updateCustomerAPI(
        customerId,
        {
          ...rest,
          locations,
        },
        token
      );

      onFinish && onFinish();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createCustomer,
    updateCustomer,
  };
}
