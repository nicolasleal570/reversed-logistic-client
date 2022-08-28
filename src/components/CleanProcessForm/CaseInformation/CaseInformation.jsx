import { useForm } from 'react-hook-form';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { SelectField } from '@components/SelectField/SelectField';
import { FormRow } from '@components/FormRow/FormRow';
import { Button, SM_SIZE } from '@components/Button/Button';
import { useCreateCleanProcessOrderForm } from '@hooks/useCreateCleanProcessOrderForm';

export function CaseInformation({
  isEdit = false,
  onlyRead = false,
  cases,
  casesContent,
  onChangeStep,
}) {
  const { caseInformation, setCaseInformation } =
    useCreateCleanProcessOrderForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...caseInformation },
  });

  const onSubmit = async (data) => {
    setCaseInformation({
      caseId: Number.parseInt(data.caseId, 10),
      caseContentId: Number.parseInt(data.caseContentId, 10),
    });
    onChangeStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm md:w-96">
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
          disabled={onlyRead}
          inputProps={{
            ...register('caseContentId', {
              required:
                'Debes seleccionar el contenido que tenía el case para la limpieza',
            }),
          }}
          options={casesContent.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
        />
      </FormRow>

      <div className="w-2/5 mt-4 ml-auto">
        <Button type="submit" size={SM_SIZE}>
          {isEdit ? 'Terminar edición' : 'Siguiente'}
        </Button>
      </div>
    </form>
  );
}
