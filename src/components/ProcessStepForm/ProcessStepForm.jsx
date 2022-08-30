import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { InputField } from '@components/InputField/InputField';
import { FormRow } from '@components/FormRow/FormRow';
import { Button, SM_SIZE } from '@components/Button/Button';
import { TextareaField } from '@components/TextareaField/TextareaField';
import { useProcessStep } from '@hooks/useProcessStep';

export function ProcessStepForm({
  isEdit = false,
  onlyRead = false,
  processStep,
  token,
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { createProcessStep, updateProcessStep } = useProcessStep();

  const handleOnFinishUpdate = () => router.push('/clean-process/steps');

  const onSubmit = async (data) => {
    if (!isEdit) {
      createProcessStep(data, token);
    } else {
      updateProcessStep(processStep.id, data, token, handleOnFinishUpdate);
    }
  };

  useEffect(() => {
    if (processStep) {
      setValue('name', processStep.name);
      setValue('description', processStep.description);
      setValue('instructions', processStep.instructions);
      setValue('guidelines', processStep.guidelines);
    }
  }, [processStep, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm md:w-96">
      <h2 className="w-full text-lg leading-7 font-medium mb-8">
        Información del proceso
      </h2>

      <FormRow>
        <InputLabel title="Nombre" inputId="name" />
        <InputField
          type="text"
          placeholder="Limpieza de agua caliente"
          id="name"
          name="name"
          inputProps={{
            ...register('name', {
              required: 'Debes ingresar el nombre del proceso',
            }),
          }}
          errors={errors}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Descripción" inputId="description" />
        <InputField
          type="text"
          placeholder="Este proceso se encarga de limpiar el case con agua caliente"
          id="description"
          name="description"
          inputProps={{
            ...register('description'),
          }}
          errors={errors}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Instrucciones" inputId="instructions" />
        <TextareaField
          placeholder="Mantén el case en agua caliente por media hora"
          id="instructions"
          name="instructions"
          inputProps={{
            ...register('instructions', {
              required: 'Debes indicar las instrucciones de este paso',
            }),
          }}
          errors={errors}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Guidelines" inputId="guidelines" />
        <TextareaField
          placeholder="Retira la tapa del case, quita el contenido, sumerge el case..."
          id="guidelines"
          name="guidelines"
          inputProps={{
            ...register('guidelines', {
              required: 'Debes indicar las instrucciones de este paso',
            }),
          }}
          errors={errors}
        />
      </FormRow>

      <div className="w-full h-[1px] my-8 bg-gray-200" />

      <div className="w-2/5 mt-4 ml-auto">
        <Button type="submit" size={SM_SIZE}>
          {isEdit ? 'Terminar edición' : 'Crear nuevo paso'}
        </Button>
      </div>
    </form>
  );
}
