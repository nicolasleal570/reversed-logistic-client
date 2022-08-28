import React, { useState } from 'react';
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
        await createCleanProcessOrderFull(data, token);
        router.push('/clean-process');
      }
    } catch (error) {
      console.log('[Clean process order]', error);
    }
  };

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
      }}
    >
      {children}
    </CreateCleanProcessOrderFormContext.Provider>
  );
}
