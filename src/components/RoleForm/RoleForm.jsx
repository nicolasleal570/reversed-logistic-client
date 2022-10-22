import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { TextareaField } from '@components/TextareaField/TextareaField';
import { InputField } from '@components/InputField/InputField';
import { FormRow } from '@components/FormRow/FormRow';
import { Button, SM_SIZE } from '@components/Button/Button';
import { PermissionSectionUserForm } from '@components/PermissionSectionUserForm/PermissionSectionUserForm';
import { useRoles } from '@hooks/useRoles';
import { listOfModules } from '@components/CreateUser/AssignPermissions/checkboxesGroupFields';

export function RoleForm({
  isEdit = false,
  onlyRead = false,
  role,
  permissions,
  token,
  onUpdate,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  const { createRole, updateRole } = useRoles();

  const onSubmit = async (data) => {
    const { name, description, ...selectedPermissions } = data;

    const permissionsWithFormat = Object.entries(selectedPermissions).filter(
      ([, item]) => item === true
    );

    const payload = {
      name,
      description,
      permissions: permissionsWithFormat,
    };

    if (!isEdit) {
      createRole(payload, token);
    } else {
      const { data: updatedRole } = await updateRole(role.id, payload, token);
      onUpdate(updatedRole);
    }
  };

  useEffect(() => {
    if (role) {
      setValue('name', role.name);
      setValue('description', role.description);

      role.permissions.forEach((item) => {
        setValue(item.value.toLowerCase(), true);
      });
    }
  }, [role, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="max-w-sm md:w-96">
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
          <TextareaField
            placeholder="Este rol de encarga de XYZ"
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
      </div>

      <h2 className="w-full text-lg leading-7 font-medium mb-8">Permisos</h2>

      {listOfModules(permissions).map((section) => (
        <FormRow key={section.title}>
          <PermissionSectionUserForm control={control} info={section} />
        </FormRow>
      ))}

      <div className="w-full h-[1px] my-8 bg-gray-200" />

      <div className="w-4/12 lg:w-2/12 mt-4 ml-auto">
        <Button type="submit" size={SM_SIZE}>
          {isEdit ? 'Terminar edición' : 'Crear rol'}
        </Button>
      </div>
    </form>
  );
}
