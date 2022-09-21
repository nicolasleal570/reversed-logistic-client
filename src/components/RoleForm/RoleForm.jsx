import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { InputField } from '@components/InputField/InputField';
import { FormRow } from '@components/FormRow/FormRow';
import { Button, SM_SIZE } from '@components/Button/Button';
import { useRoles } from '@hooks/useRoles';

export function RoleForm({ isEdit = false, onlyRead = false, role, token }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { createRole, updateRole } = useRoles();

  const handleOnFinishUpdate = () => router.push('/roles');

  const onSubmit = async (data) => {
    if (!isEdit) {
      createRole(data, token);
    } else {
      updateRole(role.id, data, token, handleOnFinishUpdate);
    }
  };

  useEffect(() => {
    if (role) {
      setValue('name', role.name);
      setValue('description', role.description);
    }
  }, [role, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm md:w-96">
      <h2 className="w-full text-lg leading-7 font-medium mb-8">
        Información del role
      </h2>

      <FormRow>
        <InputLabel title="Nombre" inputId="name" />
        <InputField
          type="text"
          placeholder="Auxiliar de picking"
          id="name"
          name="name"
          inputProps={{
            ...register('name', {
              required: 'Debes ingresar un nombre correcto',
            }),
          }}
          errors={errors}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Descripción" inputId="description" />
        <InputField
          type="text"
          placeholder="Este rol sirve para..."
          id="description"
          name="description"
          inputProps={{
            ...register('description', {
              required: 'Debes ingresar una descripción',
            }),
          }}
          errors={errors}
        />
      </FormRow>

      <div className="w-full h-[1px] my-8 bg-gray-200" />

      <div className="w-2/5 mt-4 ml-auto">
        <Button type="submit" size={SM_SIZE}>
          {isEdit ? 'Terminar edición' : 'Crear rol'}
        </Button>
      </div>
    </form>
  );
}
