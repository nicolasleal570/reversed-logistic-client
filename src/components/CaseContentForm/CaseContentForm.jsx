import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { InputField } from '@components/InputField/InputField';
import { FormRow } from '@components/FormRow/FormRow';
import { Button, SM_SIZE } from '@components/Button/Button';
import { useCasesContent } from '@hooks/useCasesContent';

export function CaseContentForm({
  isEdit = false,
  onlyRead = false,
  caseContent,
  token,
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { createCaseContent, updateCaseContent } = useCasesContent();

  const handleOnFinishUpdate = () => router.push('/flavors');

  const onSubmit = async (data) => {
    if (!isEdit) {
      createCaseContent(data, token);
    } else {
      updateCaseContent(caseContent.id, data, token, handleOnFinishUpdate);
    }
  };

  useEffect(() => {
    if (caseContent) {
      setValue('name', caseContent.name);
      setValue('description', caseContent.description);
      setValue('price', caseContent.price);
    }
  }, [caseContent, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm md:w-96">
      <h2 className="w-full text-lg leading-7 font-medium mb-8">
        Información del sabor
      </h2>

      <FormRow>
        <InputLabel title="Nombre" inputId="name" />
        <InputField
          type="text"
          placeholder="Cerveza rubia"
          id="name"
          name="name"
          inputProps={{
            ...register('name', {
              required: 'Debes ingresar el nombre del sabor de cerveza',
            }),
          }}
          errors={errors}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Descripción" inputId="description" />
        <InputField
          type="text"
          placeholder="Sabor a xd"
          id="description"
          name="description"
          inputProps={{
            ...register('description'),
          }}
          errors={errors}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Precio x litro (Sólo números)" inputId="price" />
        <InputField
          type="number"
          placeholder="16"
          id="price"
          name="price"
          inputProps={{
            ...register('price', {
              required: 'Debes indicar el precio del sabor',
            }),
          }}
          errors={errors}
        />
      </FormRow>

      <div className="w-full h-[1px] my-8 bg-gray-200" />

      <div className="w-2/5 mt-4 ml-auto">
        <Button type="submit" size={SM_SIZE}>
          {isEdit ? 'Terminar edición' : 'Crear sabor'}
        </Button>
      </div>
    </form>
  );
}
