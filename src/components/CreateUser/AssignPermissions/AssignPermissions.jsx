import { useForm } from 'react-hook-form';
import { Button, SM_SIZE } from '@components/Button/Button';
import { useCreateUserForm } from '@hooks/useCreateUserForm';
import { PermissionSectionUserForm } from '@components/PermissionSectionUserForm/PermissionSectionUserForm';
import { listOfModules } from './checkboxesGroupFields';

export function AssignPermissions({ onChangeStep, currentStep, permissions }) {
  const { permisionsInformation, setPermissionsInformation } =
    useCreateUserForm();
  const { handleSubmit, control } = useForm({
    defaultValues: { ...permisionsInformation },
  });

  const onSubmit = (data) => {
    setPermissionsInformation(data);
    onChangeStep();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="lg:max-w-3xl grid grid-cols-1 gap-3"
    >
      {listOfModules(permissions).map((section) => (
        <PermissionSectionUserForm
          key={section.title}
          control={control}
          info={section}
        />
      ))}

      <div className="grid grid-cols-2 gap-3 ml-auto w-9/12 lg:w-5/12 mt-8">
        <Button
          type="button"
          size={SM_SIZE}
          outline
          onClick={() => onChangeStep(currentStep - 1)}
        >
          Volver
        </Button>
        <Button type="submit" size={SM_SIZE}>
          Continuar
        </Button>
      </div>
    </form>
  );
}
