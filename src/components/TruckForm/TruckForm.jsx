import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { InputField } from '@components/InputField/InputField';
import { FormRow } from '@components/FormRow/FormRow';
import { Button, SM_SIZE } from '@components/Button/Button';
import { useTrucks } from '@hooks/useTrucks';

export function TruckForm({ isEdit = false, onlyRead = false, truck, token }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { createTruck, updateTruck } = useTrucks();

  const handleOnFinishUpdate = () => router.push('/trucks');

  const onSubmit = async (data) => {
    if (!isEdit) {
      createTruck(data, token);
    } else {
      updateTruck(truck.id, data, token, handleOnFinishUpdate);
    }
    console.log(data);
  };

  useEffect(() => {
    if (truck) {
      setValue('brand', truck.brand);
      setValue('model', truck.model);
      setValue('type', truck.type);
      setValue('userId', truck.driver.id);
      setValue('licensePlate', truck.licensePlate);
    }
  }, [truck, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm md:w-96">
      <h2 className="w-full text-lg leading-7 font-medium mb-8">
        Información del vehículo
      </h2>

      <FormRow>
        <InputLabel title="Marca" inputId="brand" />
        <InputField
          type="text"
          placeholder="Volvo"
          id="brand"
          name="brand"
          inputProps={{
            ...register('brand', {
              required: 'Debes ingresar la marca del vehículo',
            }),
          }}
          errors={errors}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Modelo" inputId="model" />
        <InputField
          type="text"
          placeholder="Volvo FH16"
          id="model"
          name="model"
          inputProps={{
            ...register('model', {
              required: 'Debes ingresar el modelo del vehículo',
            }),
          }}
          errors={errors}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Tipo" inputId="type" />
        <InputField
          type="text"
          placeholder="Camión"
          id="type"
          name="type"
          inputProps={{
            ...register('type', {
              required: 'Debes ingresar el tipo de vehículo',
            }),
          }}
          errors={errors}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Placa" inputId="licensePlate" />
        <InputField
          type="text"
          placeholder="ABC123"
          id="licensePlate"
          name="licensePlate"
          inputProps={{
            ...register('licensePlate', {
              required: 'Debes ingresar la placa del vehículo',
            }),
          }}
          errors={errors}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Conductor" inputId="userId" />
        <InputField
          type="text"
          placeholder="xd"
          id="userId"
          name="userId"
          inputProps={{
            ...register('userId', {
              required: 'Debes ingresar el conductor responsable del vehículo',
            }),
          }}
          errors={errors}
        />
      </FormRow>

      <div className="w-full h-[1px] my-8 bg-gray-200" />

      <div className="w-2/5 mt-4 ml-auto">
        <Button type="submit" size={SM_SIZE}>
          {isEdit ? 'Terminar edición' : 'Crear vehículo'}
        </Button>
      </div>
    </form>
  );
}
