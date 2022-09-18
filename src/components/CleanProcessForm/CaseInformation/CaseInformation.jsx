import { useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { SelectField } from '@components/SelectField/SelectField';
import { FormRow } from '@components/FormRow/FormRow';
import { Button, SM_SIZE } from '@components/Button/Button';
import { useCreateCleanProcessOrderForm } from '@hooks/useCreateCleanProcessOrderForm';
import { fetchCaseInfoLastOutOfStock } from '@api/cases/methods';

export function CaseInformation({
  isEdit = false,
  onlyRead = false,
  cases,
  casesContent,
  onChangeStep,
}) {
  const { caseInformation, lastOutOfStockInfo, setLastOutOfStockInfo } =
    useCreateCleanProcessOrderForm();
  const [cookies] = useCookies();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: { ...caseInformation },
  });
  const caseIdField = useWatch({ control, name: 'caseId' });
  const [isLoading, setIsLoading] = useState(false);

  const handleCaseIdChange = async () => {
    try {
      setIsLoading(true);
      const res = await fetchCaseInfoLastOutOfStock(caseIdField, cookies.token);
      setIsLoading(false);
      setLastOutOfStockInfo(res.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const onSubmit = async () => {
    onChangeStep();
  };

  useEffect(() => {
    if (caseIdField && !isLoading && !lastOutOfStockInfo) {
      handleCaseIdChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseIdField]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm md:w-96">
      {cases.length === 0 && (
        <div className="bg-red-200 border border-red-300 w-full mb-4 rounded p-4">
          <h3 className="text-lg font-bold text-gray-800">Alerta!</h3>
          <p className="text-gray-700">
            En este momento no hay cases disponibles para limpieza.
          </p>
        </div>
      )}

      <h2 className="w-full text-lg leading-7 font-medium mb-8">
        Información del case
      </h2>

      <FormRow>
        <InputLabel title="Case" inputId="caseId" />
        <SelectField
          id="caseId"
          name="caseId"
          errors={errors}
          placeholder="Selecciona un case"
          disabled={onlyRead}
          inputProps={{
            ...register('caseId', {
              required: 'Debes seleccionar un case para la limpieza',
            }),
          }}
          options={cases.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Contenido del case" inputId="caseContentId" />
        <SelectField
          id="caseContentId"
          name="caseContentId"
          errors={errors}
          placeholder="Selecciona el contenido que tenía el case"
          value={caseInformation.caseContentId}
          inputProps={{
            ...register('caseContentId'),
          }}
          options={casesContent.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          disabled
        />
      </FormRow>

      <div className="w-2/5 mt-4 ml-auto">
        <Button
          type="submit"
          size={SM_SIZE}
          disabled={isLoading || cases.length === 0}
        >
          {isEdit ? 'Terminar edición' : 'Siguiente'}
        </Button>
      </div>
    </form>
  );
}
