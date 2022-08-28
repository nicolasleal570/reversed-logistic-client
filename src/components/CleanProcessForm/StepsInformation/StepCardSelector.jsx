import { PlusSmIcon, TrashIcon } from '@heroicons/react/outline';
import { FormRow } from '@components/FormRow/FormRow';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { SelectField } from '@components/SelectField/SelectField';

export const INITIAL_STEP = {
  processStepId: '',
};

export function StepCardSelector({
  idx,
  field,
  isEdit,
  onlyRead,
  register,
  steps,
  errors,
  handleRemoveStep,
  insert,
}) {
  return (
    <>
      {idx > 0 && (
        <button
          type="button"
          className="mb-4 bg-white border border-gray-200 shadow-sm p-4 rounded-lg flex items-center w-full text-sm leading-5 font-medium"
          onClick={() => insert(idx, INITIAL_STEP)}
        >
          <PlusSmIcon className="w-5 mr-1 text-gray-600" />
          <span className="text-gray-700">Agregar un paso</span>
        </button>
      )}
      <div
        key={field.id}
        className="bg-white border border-gray-200 shadow-sm p-4 rounded-lg mb-4"
      >
        <div className="flex justify-between items-center mb-4">
          <p className="flex-1 text-base leading-6 font-medium text-gray-700">
            Paso {idx + 1}
          </p>

          {idx > 0 && !onlyRead && (
            <>
              <button
                type="button"
                className="text-gray-600 mr-4"
                onClick={handleRemoveStep(idx)}
              >
                <TrashIcon className="w-5" />
              </button>
            </>
          )}
        </div>

        {isEdit && (
          <input
            type="hidden"
            name="id"
            {...register(`steps.${idx}.id`, {
              required: '',
            })}
          />
        )}

        <FormRow>
          <InputLabel
            title="Selecciona un paso de limpieza"
            inputId="processStepId"
          />
          <SelectField
            id="processStepId"
            name="processStepId"
            placeholder="Selecciona uno de los pasos"
            disabled={onlyRead}
            inputProps={{
              ...register(`steps.${idx}.processStepId`, {
                required: 'Debes ingresar la ciudad',
              }),
            }}
            options={steps.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            errors={errors?.steps?.[idx]}
          />
        </FormRow>
      </div>
    </>
  );
}
