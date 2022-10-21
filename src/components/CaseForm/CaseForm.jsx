import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { InputField } from '@components/InputField/InputField';
import { FormRow } from '@components/FormRow/FormRow';
import { Button, SM_SIZE } from '@components/Button/Button';
import { useCases } from '@hooks/useCases';
import { useNotify } from '@hooks/useNotify';

function CaseForm({
  isEdit = false,
  onlyRead = false,
  case: caseInfo,
  onUpdate,
  token,
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { asyncNotify } = useNotify();

  const { createCase, updateCase } = useCases();

  const onSubmit = async (data) => {
    if (!isEdit) {
      await asyncNotify(createCase(data, token), {
        pending: 'Creando un case...',
        success: 'Se creó correctamente.',
        error: 'Tuvimos problemas con la creación del case. Intenta de nuevo.',
      });
    } else {
      const { data: updatedCase } = await asyncNotify(
        updateCase(caseInfo.id, data, token),
        {
          pending: 'Actualizando el case...',
          success: 'Se actualizó correctamente.',
          error:
            'Tuvimos problemas con la actualización del case. Intenta de nuevo.',
        }
      );
      onUpdate(updatedCase);
    }
  };

  useEffect(() => {
    if (caseInfo) {
      setValue('name', caseInfo.name);
      setValue('description', caseInfo.description);
      setValue('volume', Number.parseInt(caseInfo.volume));
      setValue('weight', Number.parseInt(caseInfo.weight));
    }
  }, [caseInfo, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm md:w-96">
      <h2 className="w-full text-lg leading-7 font-medium mb-8">
        Información del case
      </h2>

      <FormRow>
        <InputLabel title="Identificador" inputId="name" />
        <InputField
          type="text"
          placeholder="Case #532"
          id="name"
          name="name"
          inputProps={{
            ...register('name', {
              required: 'Debes ingresar un identificador para el case',
            }),
          }}
          errors={errors}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Comentarios" inputId="description" />
        <InputField
          type="text"
          placeholder="Tiene un golpe y es rojo"
          id="description"
          name="description"
          inputProps={{
            ...register('description'),
          }}
          errors={errors}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Volumen (L) (Sólo números)" inputId="volume" />
        <InputField
          type="number"
          placeholder="20"
          id="volume"
          name="volume"
          inputProps={{
            ...register('volume', {
              required: 'Debes indicar el volumen del case',
            }),
          }}
          errors={errors}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Peso (Kg) (Sólo números)" inputId="weight" />
        <InputField
          type="number"
          placeholder="20"
          id="weight"
          name="weight"
          inputProps={{
            ...register('weight', {
              required: 'Debes indicar el peso del case',
            }),
          }}
          errors={errors}
        />
      </FormRow>

      <div className="w-full h-[1px] my-8 bg-gray-200" />

      <div className="w-2/5 mt-4 ml-auto">
        <Button type="submit" size={SM_SIZE}>
          {isEdit ? 'Terminar edición' : 'Crear case'}
        </Button>
      </div>
    </form>
  );
}

export default CaseForm;
