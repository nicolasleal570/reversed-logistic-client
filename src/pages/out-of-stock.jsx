import { Fragment, useEffect, useState } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { withLocationProtection } from '@components/withLocationProtection';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { FormRow } from '@components/FormRow/FormRow';
import { Button } from '@components/Button/Button';
import { fetchCasesByCustomer } from '@api/cases/methods';
import { parseCookies } from '@utils/parseCookies';
import { useOutOfStockOrders } from '@hooks/useOutOfStockOrders';
import { MultipleSelectCasesField } from '@components/MultipleSelectCasesField/MultipleSelectCasesField';
import { useAuth } from '@hooks/useAuth';

const INITIAL_CASE_ID = { caseId: '' };

function OutOfStockPage({
  cases: casesData,
  customerLocationId,
  location: client,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      cases: [INITIAL_CASE_ID],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cases',
  });
  const selectedCases = useWatch({ control, name: 'cases' });
  const { createOutOfStockOrder } = useOutOfStockOrders();
  const { handleLogout } = useAuth();
  const [cases, setCases] = useState([]);

  const onSubmit = async (data) => {
    const items = data.cases.map((field) => {
      const {
        name: _name,
        id: caseId,
        ...caseInfo
      } = cases.find((elem) => field.caseId === String(elem.id));

      return {
        caseId,
        ...caseInfo,
      };
    });

    try {
      await createOutOfStockOrder({ items, customerLocationId });
      setCases((oldValues) => {
        const casesIds = items.map((item) => item.caseId);

        return oldValues.filter((item) => !casesIds.includes(item.id));
      });
      reset();
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    setCases(casesData);
  }, [casesData]);

  return (
    <>
      <nav className="flex items-center justify-between py-8 border-b border-gray-200 px-[120px]">
        <p className="text-base lg:text-xl leading-9 tracking-tight text-left text-gray-900">
          Hola <span className="font-medium">{client.location.name}</span>!
        </p>

        <button
          type="button"
          className="border border-red-600 text-red-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
          onClick={handleLogout}
        >
          <span>Cerrar sesión</span>
        </button>
      </nav>
      <div className="flex justify-center pt-32 bg-white h-full overflow-y-auto px-6 lg:px-0">
        <div className="flex flex-col self-start bg-white border border-gray-200 shadow rounded-lg p-6 lg:px-12 lg:pb-16 lg:pt-8 w-[458px]">
          <p className="text-sm md:text-base leading-6 font-normal text-left text-gray-500 mb-3">
            Reporta aquí los cases que tienes vacíos
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {fields.map((field, idx) => (
              <Fragment key={field.id}>
                <FormRow>
                  <div className="w-full flex items-center justify-between">
                    <InputLabel title="Selecciona un case" inputId="caseId" />

                    {idx > 0 && (
                      <button
                        type="button"
                        className="text-xs font-medium text-right text-red-500"
                        onClick={() => remove(idx)}
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                  <MultipleSelectCasesField
                    allCases={cases || []}
                    selectedCases={selectedCases || []}
                    highlight="Selecciona el case que se agotó"
                    fieldName={`cases.${idx}.caseId`}
                    {...{ register, idx, errors }}
                  />
                </FormRow>
              </Fragment>
            ))}

            {cases.length > 1 && (
              <button
                type="button"
                className="block w-full text-sm leading-5 font-medium text-right text-indigo-700 mb-12"
                onClick={() => append(INITIAL_CASE_ID)}
              >
                Agregar otro
              </button>
            )}

            <Button type="submit">Finalizar reporte</Button>
          </form>
        </div>
      </div>
    </>
  );
}

OutOfStockPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let cases = [];
  let customerLocationId = '';
  if (data.token) {
    try {
      const res = await fetchCasesByCustomer(data.token);
      cases = res.data.cases;
      customerLocationId = res.data.customerLocationId;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    cases: cases ?? [],
    customerLocationId: customerLocationId ?? '',
  };
};

export default withLocationProtection(OutOfStockPage);
