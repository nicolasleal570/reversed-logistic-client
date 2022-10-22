import { useRouter } from 'next/router';
import * as customersAPI from '@api/customers/methods';
import { useNotify } from './useNotify';

const { createCustomer: createCustomerAPI, updateCustomer: updateCustomerAPI } =
  customersAPI;

export function useCustomers() {
  const router = useRouter();
  const { asyncNotify } = useNotify();

  const createCustomer = async (data, token) => {
    const { locations, ...rest } = data;

    try {
      const res = await asyncNotify(
        createCustomerAPI(
          {
            ...rest,
            locations,
          },
          token
        ),
        {
          pending: 'Creando nuevo cliente...',
          success: 'Se creó un cliente correctamente',
          error: 'Tuvimos problemas creando el cliente. Intenta de nuevo.',
        }
      );

      router.push(`/customers/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCustomer = async (customerId, data, token) => {
    const { locations, ...rest } = data;

    try {
      return asyncNotify(
        updateCustomerAPI(
          customerId,
          {
            ...rest,
            locations,
          },
          token
        ),
        {
          pending: 'Actualizando cliente...',
          success: 'Se actualizó el cliente correctamente',
          error:
            'Tuvimos problemas para actualizar el cliente. Intenta de nuevo.',
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createCustomer,
    updateCustomer,
  };
}
