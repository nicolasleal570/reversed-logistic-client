import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { InputField } from '@components/InputField/InputField';
import { FormRow } from '@components/FormRow/FormRow';
import { Button, SM_SIZE } from '@components/Button/Button';
import { useRouter } from 'next/router';
import { SelectField } from '@components/SelectField/SelectField';
import { useUsers } from '@hooks/useUsers';

export function UserForm({
  isEdit = false,
  onlyRead = false,
  user,
  roles,
  token,
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { createUser, updateUser } = useUsers();

  const handleOnFinishUpdate = () => {
    router.push('/users');
  };

  const onSubmit = async (data) => {
    if (!isEdit) {
      createUser(
        {
          ...data,
          password: 'password',
        },
        token
      );
    } else {
      const { email: _, ...rest } = data;
      updateUser(user.id, rest, token, handleOnFinishUpdate);
    }
  };

  useEffect(() => {
    if (user) {
      setValue('fullName', user.fullName);
      setValue('email', user.email);
      setValue('phone', user.phone);
      setValue('roleId', String(user.roles[0]?.id));
    }
  }, [user, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm md:w-96">
      <h2 className="w-full text-lg leading-7 font-medium mb-8">
        Información básica
      </h2>

      <FormRow>
        <InputLabel title="Nombre del empleado" inputId="fullName" />
        <InputField
          id="fullName"
          name="fullName"
          errors={errors}
          placeholder="John Doe"
          disabled={onlyRead}
          inputProps={{
            ...register('fullName', {
              required: 'Debes ingresar el nombre del empleado',
            }),
          }}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Correo electrónico" inputId="email" />
        <InputField
          id="email"
          name="email"
          placeholder="john@email.com"
          errors={errors}
          disabled={isEdit}
          inputProps={{
            ...register('email', {
              required: 'Debes ingresar un correo electrónico válido',
            }),
          }}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Teléfono" inputId="phone" />
        <InputField
          id="phone"
          name="phone"
          placeholder="04241234532"
          errors={errors}
          disabled={onlyRead}
          inputProps={{
            ...register('phone', {
              required: 'Debes ingresar un teléfono válido',
            }),
          }}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Rol" inputId="roleId" />
        <SelectField
          id="roleId"
          name="roleId"
          errors={errors}
          placeholder="Selecciona un rol"
          highlight="Seleccionando un rol, los permisos se agregan automáticamente"
          disabled={onlyRead}
          inputProps={{
            ...register('roleId', {
              required: 'Debes seleccionar un rol',
            }),
          }}
          options={roles.map((role) => ({
            label: role.name,
            value: role.id,
          }))}
        />
      </FormRow>

      <div className="w-full h-[1px] my-8 bg-gray-200" />

      {!onlyRead && (
        <>
          <div className="w-2/5 mt-4 ml-auto">
            <Button type="submit" size={SM_SIZE}>
              {isEdit ? 'Terminar edición' : 'Crear usuario'}
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
