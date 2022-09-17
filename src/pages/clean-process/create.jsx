import { useState } from 'react';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';
import { fetchCustomers } from '@api/customers/methods';
import {
  fetchCaseInfoLastOutOfStock,
  fetchCases,
  fetchCasesContent,
} from '@api/cases/methods';
import { CustomSidebar } from '@components/CustomSidebar/CustomSidebar';
import { useFormStepper } from '@hooks/useFormStepper';
import { CaseInformation } from '@components/CleanProcessForm/CaseInformation/CaseInformation';
import { CustomerInformation } from '@components/CleanProcessForm/CustomerInformation/CustomerInformation';
import CreateCleanProcessOrderFormContextProvider from '@contexts/CreateCleanProcessOrderFormContent/CreateCleanProcessOrderFormContext';
import { StepsInformation } from '@components/CleanProcessForm/StepsInformation/StepsInformation';
import { CleanProcessFormSummary } from '@components/CleanProcessForm/CleanProcessFormSummary/CleanProcessFormSummary';
import { fetchProcessSteps } from '@api/process-steps/methods';

const steps = [
  {
    title: 'Información sobre el case',
    description:
      'Ingresa la información referente al case que quieres enviar a limpieza',
  },
  {
    title: 'Información del cliente',
    description:
      'Ingresa la información referente al cliente que utilizó el case',
  },
  {
    title: 'Asigna los pasos de limpieza',
    description:
      'Asigna los pasos de limpieza por los que debería pasar el case',
  },
  {
    title: 'Resúmen de los datos',
    description:
      'Aquí se muestra un resúmen de los datos que ingresaste para la nueva órden de limpieza.',
  },
];

function CreateCleanProcessPage({
  token,
  customers,
  cases,
  casesContent,
  processSteps,
}) {
  const { currentStep, onChangeStep } = useFormStepper(steps);
  const [customerLocations, setCustomerLocations] = useState({
    customer: {},
    locations: [],
  });

  return (
    <CreateCleanProcessOrderFormContextProvider>
      <Layout
        title="Crear una orden de limpieza"
        description="Crea una nueva orden para la limpieza de un case."
        customSubSidebar={
          <CustomSidebar
            currentStep={currentStep}
            steps={steps}
            title="Creación de una órden de limpieza"
          />
        }
      >
        {currentStep === 0 && (
          <CaseInformation
            cases={cases}
            casesContent={casesContent}
            onChangeStep={onChangeStep}
          />
        )}

        {currentStep === 1 && (
          <CustomerInformation
            token={token}
            customers={customers}
            currentStep={currentStep}
            customerLocations={customerLocations}
            setCustomerLocations={setCustomerLocations}
            onChangeStep={onChangeStep}
          />
        )}

        {currentStep === 2 && (
          <StepsInformation
            token={token}
            steps={processSteps}
            currentStep={currentStep}
            onChangeStep={onChangeStep}
          />
        )}

        {currentStep === 3 && (
          <CleanProcessFormSummary
            token={token}
            cases={cases}
            casesContent={casesContent}
            customers={customers}
            steps={processSteps}
            currentStep={currentStep}
            customerLocations={customerLocations}
            onChangeStep={onChangeStep}
          />
        )}
      </Layout>
    </CreateCleanProcessOrderFormContextProvider>
  );
}

CreateCleanProcessPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let customers = [];
  let cases = [];
  let casesContent = [];
  let processSteps = [];
  if (data.token) {
    try {
      const res = await fetchCustomers(data.token);
      const { data: casesArr } = await fetchCases(data.token, {
        state: 'WAITING_CLEAN_PROCESS',
      });
      const { data: casesContentArr } = await fetchCasesContent(data.token);
      const { data: processStepsArr } = await fetchProcessSteps(data.token);
      customers = res.data;
      cases = casesArr;
      casesContent = casesContentArr;
      processSteps = processStepsArr;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    token: data?.token ?? '',
    customers: customers ?? [],
    cases: cases ?? [],
    casesContent: casesContent ?? [],
    processSteps: processSteps ?? [],
  };
};

export default withProtection(CreateCleanProcessPage);
