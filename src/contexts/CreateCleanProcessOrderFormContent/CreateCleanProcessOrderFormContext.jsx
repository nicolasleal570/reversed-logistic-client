import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from '@utils/parseCookies';
import { createCleanProcessOrderFull } from '@api/clean-process-order/methods';

export const CreateCleanProcessOrderFormContext = React.createContext({
  personalInformation: undefined,
});

export default function CreateCleanProcessOrderFormContextProvider({
  children,
}) {
  const router = useRouter();
  const [lastOutOfStockInfo, setLastOutOfStockInfo] = useState();
  const [caseInformation, setCaseInformation] = useState({
    caseId: null,
    caseContentId: null,
  });
  const [customerInformation, setCustomerInformation] = useState({
    customerId: null,
    customerLocationId: null,
    details: '',
  });
  const [processSteps, setProcessSteps] = useState({ steps: [] });

  const onCreateCleanProcessOrder = async () => {
    try {
      const { customerId: _, ...restCustomerInfo } = customerInformation;

      const data = {
        ...caseInformation,
        ...restCustomerInfo,
        ...processSteps,
      };

      const { token } = parseCookies() ?? {};

      if (token) {
        const { data: createdOrder } = await createCleanProcessOrderFull(
          data,
          token
        );
        router.push(`/clean-process/${createdOrder.id}`);
      }
    } catch (error) {
      console.log('[Clean process order]', error);
    }
  };

  useEffect(() => {
    if (lastOutOfStockInfo) {
      const { caseId, caseContentId, order } = lastOutOfStockInfo;
      setCaseInformation(() => ({
        caseId: caseId,
        caseContentId: caseContentId,
      }));
      setCustomerInformation((oldValues) => ({
        ...oldValues,
        customerId: String(order.customerLocation.customer.id),
        customerLocationId: String(order.customerLocationId),
      }));
    }
  }, [lastOutOfStockInfo]);

  return (
    <CreateCleanProcessOrderFormContext.Provider
      value={{
        caseInformation,
        setCaseInformation,
        customerInformation,
        setCustomerInformation,
        processSteps,
        setProcessSteps,
        onCreateCleanProcessOrder,
        lastOutOfStockInfo,
        setLastOutOfStockInfo,
      }}
    >
      {children}
    </CreateCleanProcessOrderFormContext.Provider>
  );
}
