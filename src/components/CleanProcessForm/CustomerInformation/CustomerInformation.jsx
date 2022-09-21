import { useState, useCallback, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { InputField } from '@components/InputField/InputField';
import { SelectField } from '@components/SelectField/SelectField';
import { FormRow } from '@components/FormRow/FormRow';
import { Button, SM_SIZE } from '@components/Button/Button';
import { fetchCustomerLocationsByCustomer } from '@api/customers/methods';
import { formatCustomerLocationName } from '@components/OrderForm/OrderForm';
import { useCreateCleanProcessOrderForm } from '@hooks/useCreateCleanProcessOrderForm';

export function CustomerInformation({
  isEdit = false,
  onlyRead = false,
  currentStep,
  customers,
  token,
  customerLocations,
  setCustomerLocations,
  onChangeStep,
}) {
  const { customerInformation, setCustomerInformation } =
    useCreateCleanProcessOrderForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      customerId: customerInformation?.customerId,
      details: customerInformation?.details,
    },
  });

  const customerId = useWatch({ control, name: 'customerId' });
  const customerLocationId = useWatch({ control, name: 'customerLocationId' });

  const handleFetchCustomerLocations = useCallback(async () => {
    const { data } = await fetchCustomerLocationsByCustomer(customerId, token);

    if (data && data.customer && data.locations) {
      const { customer, locations } = data;
      setCustomerLocations({
        customer,
        locations,
      });
    }
  }, [customerId, token, setCustomerLocations]);

  const onSubmit = async (data) => {
    setCustomerInformation((oldInfo) => ({
      ...oldInfo,
      ...data,
      customerLocationId: Number.parseInt(data.customerLocationId, 10),
    }));
    onChangeStep();
  };

  useEffect(() => {
    if (customerId) {
      handleFetchCustomerLocations();
    }
  }, [customerId, handleFetchCustomerLocations]);

  useEffect(() => {
    const { locations } = customerLocations ?? {};
    if (
      Array.isArray(locations) &&
      locations?.length > 0 &&
      !customerLocationId
    ) {
      setValue('customerLocationId', customerInformation.customerLocationId);
    }
  }, [customerLocations, customerInformation, setValue, customerLocationId]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm md:w-96">
      <h2 className="w-full text-lg leading-7 font-medium mb-8">
        Cliente que utilizó el case
      </h2>

      <FormRow>
        <InputLabel title="Cliente" inputId="customerId" />
        <SelectField
          id="customerId"
          name="customerId"
          errors={errors}
          placeholder="Selecciona un cliente"
          inputProps={{
            ...register('customerId'),
          }}
          options={customers.map((customer) => ({
            label: customer.companyName,
            value: customer.id,
          }))}
          disabled
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Sucursal del cliente" inputId="customerLocationId" />
        <SelectField
          id="customerLocationId"
          name="customerLocationId"
          errors={errors}
          placeholder="Selecciona una sucursal"
          inputProps={{
            ...register('customerLocationId'),
          }}
          options={customerLocations.locations.map((location) => ({
            label: location.name,
            value: location.id,
          }))}
          disabled
        />
      </FormRow>

      <div className="w-full h-[1px] my-8 bg-gray-200" />

      <h2 className="w-full text-lg leading-7 font-medium mb-8">
        Información extra
      </h2>

      <FormRow>
        <InputLabel title="Comentarios" inputId="details" />
        <InputField
          type="text"
          placeholder="Ej. El case estaba golpeado"
          name="details"
          id="details"
          inputProps={{
            ...register('details'),
          }}
          errors={errors}
        />
      </FormRow>

      <div className="w-full h-[1px] my-8 bg-gray-200" />

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
          Siguiente
        </Button>
      </div>
    </form>
  );
}
