import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { SelectField } from '@components/SelectField/SelectField';
import { InputField } from '@components/InputField/InputField';
import { FormRow } from '@components/FormRow/FormRow';
import { Button, SM_SIZE } from '@components/Button/Button';
import { TextareaField } from '@components/TextareaField/TextareaField';
import { useShipments } from '@hooks/useShipments';

export function ShipmentForm({
  isEdit = false,
  onlyRead = false,
  shipment,
  trucks,
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { createShipment, updateShipment } = useShipments();

  const handleOnFinishUpdate = () => router.push('/shipments');

  const onSubmit = async (data) => {
    const { customerId: _, ...restData } = data;
    if (!isEdit) {
      createShipment(restData);
    } else {
      updateShipment(shipment.id, restData, handleOnFinishUpdate);
    }
  };

  useEffect(() => {
    if (shipment) {
      setValue('details', shipment.details);
      setValue('truckId', shipment.truckId);
      setValue(
        'shipmentAt',
        dayjs(shipment.shipmentAt).format('YYYY-MM-DDTHH:mm')
      );
    }
  }, [shipment, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm md:w-96">
      <h2 className="w-full text-lg leading-7 font-medium mb-8">
        Información del envío
      </h2>

      <FormRow>
        <InputLabel title="Transportes disponibles" inputId="truckId" />
        <SelectField
          id="truckId"
          name="truckId"
          errors={errors}
          placeholder="Selecciona un transporte"
          disabled={onlyRead}
          inputProps={{
            ...register('truckId', {
              required: 'Debes seleccionar un transporte',
            }),
          }}
          options={trucks.map((truck) => ({
            label: `${truck.model} - ${truck.brand} - ${truck.licensePlate}`,
            value: truck.id,
          }))}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Fecha de envío" inputId="shipmentAt" />
        <InputField
          type="datetime-local"
          id="shipmentAt"
          name="shipmentAt"
          inputProps={{
            min: !isEdit ? dayjs().format('YYYY-MM-DDTHH:mm') : null,
            ...register('shipmentAt'),
          }}
          errors={errors}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Detalles" inputId="details" />
        <TextareaField
          placeholder="Se hace envío de X cases a X clientes"
          id="details"
          name="details"
          inputProps={{
            ...register('details'),
          }}
          errors={errors}
        />
      </FormRow>

      <div className="w-full h-[1px] my-8 bg-gray-200" />

      <div className="w-2/5 mt-4 ml-auto">
        <Button type="submit" size={SM_SIZE}>
          {isEdit ? 'Terminar edición' : 'Crear envío'}
        </Button>
      </div>
    </form>
  );
}
