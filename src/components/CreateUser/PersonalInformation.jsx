import { useForm } from 'react-hook-form';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { InputField } from '@components/InputField/InputField';
import { FormRow } from '@components/FormRow/FormRow';
import { Button, SM_SIZE } from '@components/Button/Button';
import { useCreateUserForm } from '@hooks/useCreateUserForm';

export function PersonalInformation({ onChangeStep }) {
  const { personalInformation, setPersonalInformation } = useCreateUserForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...personalInformation },
  });

  const onSubmit = (data) => {
    setPersonalInformation(data);
    onChangeStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <FormRow>
        <InputLabel title="Nombre completo" inputId="fullName" />
        <InputField
          type="text"
          placeholder="John Doe"
          name="fullName"
          id="fullName"
          inputProps={{
            ...register('fullName', {
              required: 'Debes ingresar el nombre completo',
            }),
          }}
          errors={errors}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Correo Electrónico" inputId="email" />
        <InputField
          type="email"
          placeholder="john@email.com"
          name="email"
          id="email"
          inputProps={{
            ...register('email', { required: 'Debes ingresar un correo' }),
          }}
          errors={errors}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Número telefónico" inputId="phone" />
        <InputField
          type="phone"
          placeholder="584142431234"
          name="phone"
          id="phone"
          inputProps={{
            ...register('phone', {
              required: 'Debes ingresar un número telefónico',
            }),
          }}
          errors={errors}
        />
      </FormRow>

      <div className="ml-auto w-1/3">
        <Button type="submit" size={SM_SIZE}>
          Continuar
        </Button>
      </div>
    </form>
  );
}
