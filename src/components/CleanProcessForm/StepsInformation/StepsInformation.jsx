import { useEffect } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { PlusSmIcon } from '@heroicons/react/outline';
import { Button, SM_SIZE } from '@components/Button/Button';
import { useCreateCleanProcessOrderForm } from '@hooks/useCreateCleanProcessOrderForm';
import { StepCardSelector, INITIAL_STEP } from './StepCardSelector';

export function StepsInformation({
  isEdit = false,
  onlyRead = false,
  currentStep,
  steps,
  onChangeStep,
}) {
  const { processSteps, setProcessSteps } = useCreateCleanProcessOrderForm();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      steps: [INITIAL_STEP],
    },
  });
  const stepsFields = useWatch({ control, name: 'steps' });

  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: 'steps',
  });

  const handleRemoveStep = (idx) => () => {
    if (stepsFields.length > 1) {
      remove(idx);
    }
  };

  const onSubmit = async (data) => {
    setProcessSteps(data);
    onChangeStep();
  };

  useEffect(() => {
    if (processSteps?.steps?.length > 0) {
      setValue(
        'steps',
        processSteps.steps.map((item) => ({
          processStepId: item.processStepId,
        }))
      );
    }
  }, [processSteps, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm md:w-96">
      <h2 className="w-full text-lg leading-7 font-medium mb-8">
        Asigna los pasos de la limpieza
      </h2>

      {fields.map((field, idx) => {
        return (
          <StepCardSelector
            key={field.id}
            idx={idx}
            field={field}
            isEdit={isEdit}
            onlyRead={onlyRead}
            register={register}
            steps={steps}
            errors={errors}
            handleRemoveStep={handleRemoveStep}
            insert={insert}
          />
        );
      })}

      {!onlyRead && (
        <>
          <button
            type="button"
            className="bg-white border border-gray-200 shadow-sm p-4 rounded-lg flex items-center w-full text-sm leading-5 font-medium"
            onClick={() => append(INITIAL_STEP)}
          >
            <PlusSmIcon className="w-5 mr-1 text-gray-600" />
            <span className="text-gray-700">Agregar un paso</span>
          </button>

          <div className="w-full h-[1px] my-8 bg-gray-200" />

          <div className="grid grid-cols-2 gap-3 ml-auto w-9/12 mt-8">
            <Button
              type="button"
              size={SM_SIZE}
              outline
              onClick={() => onChangeStep(currentStep - 1)}
            >
              Volver
            </Button>

            <Button type="submit" size={SM_SIZE}>
              Crear
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
