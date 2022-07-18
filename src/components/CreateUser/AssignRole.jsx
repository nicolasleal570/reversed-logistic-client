import { useForm } from 'react-hook-form';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { FormRow } from '@components/FormRow/FormRow';
import { Button, SM_SIZE } from '@components/Button/Button';
import { useCreateUserForm } from '@hooks/useCreateUserForm';
import { SelectField } from '@components/SelectField/SelectField';

export function AssignRole({ roles, onChangeStep, currentStep }) {
  const { roleInformation, setRoleInformation } = useCreateUserForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...roleInformation },
  });

  const onSubmit = (data) => {
    setRoleInformation(data);
    onChangeStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <FormRow>
        <InputLabel title="Selecciona un rol" inputId="role" />
        <SelectField
          name="role"
          id="role"
          errors={errors}
          placeholder="Selecciona un rol"
          inputProps={{
            ...register('role', { required: 'Debes asignar un rol' }),
          }}
          options={roles.map((role) => ({
            label: role.name,
            value: role.id,
          }))}
        />
      </FormRow>

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
          Continuar
        </Button>
      </div>
    </form>
  );
}
