import { useMemo } from 'react';
import { Button, SM_SIZE } from '@components/Button/Button';
import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';
import { useCreateCleanProcessOrderForm } from '@hooks/useCreateCleanProcessOrderForm';
import { formatCustomerLocationName } from '@components/OrderForm/OrderForm';

export function CleanProcessFormSummary({
  onChangeStep,
  currentStep,
  cases,
  casesContent,
  customers,
  customerLocations,
  steps,
}) {
  const {
    caseInformation,
    customerInformation,
    processSteps,
    onCreateCleanProcessOrder,
  } = useCreateCleanProcessOrderForm();

  const currentCase = useMemo(
    () =>
      cases.find(
        (item) => item.id === Number.parseInt(caseInformation.caseId, 10)
      ),
    [caseInformation, cases]
  );

  const currentCaseContent = useMemo(
    () =>
      casesContent.find(
        (item) => item.id === Number.parseInt(caseInformation.caseContentId, 10)
      ),
    [caseInformation, casesContent]
  );

  const currentCustomer = useMemo(
    () =>
      customers.find(
        (item) =>
          item.id === Number.parseInt(customerInformation.customerId, 10)
      ),
    [customers, customerInformation]
  );

  const currentCustomerLocation = useMemo(
    () =>
      customerLocations?.locations?.find(
        (item) =>
          item.id ===
          Number.parseInt(customerInformation.customerLocationId, 10)
      ),
    [customerLocations, customerInformation]
  );

  const currentSteps = processSteps.steps.map((stepInfo) =>
    steps.find(
      (item) => item.id === Number.parseInt(stepInfo.processStepId, 10)
    )
  );

  return (
    <div className="">
      <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
        Informacion del case
      </h2>

      <DataSection label="Case seleccionado" value={currentCase.name} />
      <DataSection label="Contenido del case" value={currentCaseContent.name} />

      <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
        Cliente seleccionado
      </h2>

      <DataSection label="Cliente" value={currentCustomer.companyName} />
      <DataSection
        label="Comentarios"
        value={formatCustomerLocationName(
          customerLocations.customer,
          currentCustomerLocation
        )}
      />
      <DataSection label="Comentarios" value={customerInformation.comments} />

      <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
        Pasos de limpieza seleccionados
      </h2>

      {currentSteps.map((currentStep, idx) => (
        <DataSection
          key={JSON.stringify(currentStep)}
          label={`Paso ${idx + 1}`}
          value={currentStep.name}
        />
      ))}

      <div className="grid grid-cols-2 gap-3 ml-auto w-9/12 lg:w-3/12 mt-8">
        <Button
          type="button"
          size={SM_SIZE}
          outline
          onClick={() => onChangeStep(currentStep - 1)}
        >
          Volver
        </Button>
        <Button
          type="button"
          size={SM_SIZE}
          onClick={onCreateCleanProcessOrder}
        >
          Crear órden
        </Button>
      </div>
    </div>
  );
}
