import { Fragment, useMemo } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { withLocationProtection } from '@components/withLocationProtection';
import { SelectField } from '@components/SelectField/SelectField';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { FormRow } from '@components/FormRow/FormRow';
import { Button } from '@components/Button/Button';
import { fetchCasesByCustomer } from '@api/cases/methods';
import { parseCookies } from '@utils/parseCookies';
import { useOutOfStockOrders } from '@hooks/useOutOfStockOrders';

const INITIAL_CASE_ID = { caseId: '' };

function SelectCaseField({ allCases, selectedCases, errors, register, idx }) {
  const filteredCases = useMemo(() => {
    const selectedCasesIds = selectedCases
      .map((item) => Number.parseInt(item.caseId, 10 || '0'))
      .filter(Boolean);

    return allCases.filter((caseInfo) => {
      if (caseInfo.id === Number.parseInt(selectedCases[idx]?.caseId || '0')) {
        return caseInfo;
      }

      return !selectedCasesIds.includes(caseInfo.id);
    });
  }, [allCases, selectedCases, idx]);

  return (
    <SelectField
      id="caseId"
      name="caseId"
      errors={errors?.cases?.[idx]}
      placeholder="Selecciona un case"
      highlight="Selecciona el case que se agotó"
      inputProps={{
        ...register(`cases.${idx}.caseId`, {
          required: 'Debes seleccionar un case',
        }),
      }}
      options={filteredCases.map((caseInfo) => ({
        label: caseInfo.name,
        value: caseInfo.id,
      }))}
    />
  );
}

function OutOfStockPage({ cases, customerLocationId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
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
      const res = await createOutOfStockOrder({ items, customerLocationId });
      console.log(res.data);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="flex justify-center pt-32 bg-white min-h-screen overflow-y-auto">
      <div className="flex flex-col self-start bg-white border border-gray-200 shadow rounded-lg px-12 py-16 min-w-[458px]">
        <h1 className="w-full text-3xl leading-9 font-medium text-center text-gray-900">
          Hola XXX!
        </h1>

        <p className="text-sm md:text-base leading-6 font-normal text-center text-gray-500 my-3">
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
                <SelectCaseField
                  allCases={cases || []}
                  selectedCases={selectedCases || []}
                  {...{ register, idx, errors }}
                />
              </FormRow>
            </Fragment>
          ))}

          <button
            type="button"
            className="block w-full text-sm leading-5 font-medium text-right text-indigo-700 mb-12"
            onClick={() => append(INITIAL_CASE_ID)}
          >
            Agregar otro
          </button>

          <Button type="submit">Finalizar reporte</Button>
        </form>
      </div>
    </div>
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
