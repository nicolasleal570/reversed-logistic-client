import { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import dayjs from 'dayjs';
import { PlusSmIcon, TrashIcon } from '@heroicons/react/outline';
import { SelectField } from '@components/SelectField/SelectField';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { InputField } from '@components/InputField/InputField';
import { FormRow } from '@components/FormRow/FormRow';
import { Button, SM_SIZE } from '@components/Button/Button';
import { fetchCustomerLocationsByCustomer } from '@api/customers/methods';
import { useOrders } from '@hooks/useOrders';
import { MultipleSelectCasesField } from '@components/MultipleSelectCasesField/MultipleSelectCasesField';

const INITIAL_CASE = { caseId: '', caseContentId: '', contentQuantity: '' };

function OrderForm({
  isEdit = false,
  onlyRead = false,
  order,
  onUpdate,
  customers,
  cases,
  casesContent,
  token,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      items: [INITIAL_CASE],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });
  const customerId = useWatch({ control, name: 'customerId' });
  const casesInfo = useWatch({ control, name: 'items' });
  const [customerLocations, setCustomerLocations] = useState({
    customer: {},
    locations: [],
  });
  const { createOrder, updateOrder } = useOrders();

  const handleFetchCustomerLocations = useCallback(async () => {
    const { data } = await fetchCustomerLocationsByCustomer(customerId, token);

    if (data && data.customer && data.locations) {
      const { customer, locations } = data;
      setCustomerLocations({
        customer,
        locations,
      });
    }
  }, [customerId, token]);

  const handleRemoveCase = (idx) => () => {
    const items = getValues('items');
    if (items.length > 1) {
      remove(idx);
    }
  };

  const onSubmit = async (data) => {
    if (!isEdit) {
      await createOrder(
        {
          ...data,
          expectedDeliveryDate: data.expectedDeliveryDate ?? null,
        },
        token
      );
    } else {
      const { data: updatedOrder } = await updateOrder(
        order.id,
        {
          ...data,
          expectedDeliveryDate: data.expectedDeliveryDate ?? null,
        },
        token
      );
      onUpdate(updatedOrder);
    }
  };

  useEffect(() => {
    if (customerId) {
      handleFetchCustomerLocations();
    }
  }, [customerId, handleFetchCustomerLocations]);

  useEffect(() => {
    if (order) {
      setValue('customerId', String(order.customerLocation.customerId));
      setValue(
        'items',
        order.items.map((item) => ({
          id: item.id,
          caseId: String(item.caseId),
          caseContentId: String(item.caseContentId),
          contentQuantity: item.quantity,
        }))
      );
    }
  }, [order, setValue]);

  useEffect(() => {
    if (order && customerLocations?.locations?.length > 0) {
      setValue('customerLocationId', String(order.customerLocationId));
    }
  }, [order, customerLocations, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm md:w-96">
      <h2 className="w-full text-lg leading-7 font-medium mb-8">Cliente</h2>

      <FormRow>
        <InputLabel title="Cliente" inputId="customerId" />
        <SelectField
          id="customerId"
          name="customerId"
          errors={errors}
          placeholder="Selecciona un cliente"
          disabled={onlyRead}
          inputProps={{
            ...register('customerId', {
              required: 'Debes seleccionar un cliente',
            }),
          }}
          options={customers.map((customer) => ({
            label: customer.companyName,
            value: customer.id,
          }))}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Sucursal del cliente" inputId="customerLocationId" />
        <SelectField
          id="customerLocationId"
          name="customerLocationId"
          errors={errors}
          placeholder="Selecciona una sucursal"
          disabled={onlyRead}
          inputProps={{
            ...register('customerLocationId', {
              required: 'Debes seleccionar una sucursal',
            }),
          }}
          options={customerLocations.locations.map((location) => ({
            label: location.name,
            value: location.id,
          }))}
        />
      </FormRow>

      <div className="w-full h-[1px] my-8 bg-gray-200" />

      <h2 className="w-full text-lg leading-7 font-medium mb-8">Orden</h2>

      <FormRow>
        <InputLabel
          title="Fecha estimada de entrega"
          inputId="expectedDeliveryDate"
        />
        <InputField
          type="datetime-local"
          id="expectedDeliveryDate"
          name="expectedDeliveryDate"
          errors={errors}
          placeholder="Selecciona una sucursal"
          disabled={onlyRead}
          inputProps={{
            min: !isEdit ? dayjs().format('YYYY-MM-DDTHH:mm') : null,
            ...register('expectedDeliveryDate', {
              required: 'Debes ingresar una fecha estimada de entrega.',
            }),
          }}
          highlight="Este fecha se utiliza para calcular analíticas y KPIs."
        />
      </FormRow>

      <div className="w-full h-[1px] my-8 bg-gray-200" />

      <h2 className="w-full text-lg leading-7 font-medium mb-8">Cases</h2>

      {fields.map((field, idx) => {
        const selectedCase =
          cases.find((item) => String(item.id) === casesInfo[idx]?.caseId) ??
          {};

        return (
          <div
            key={field.id}
            className="bg-white border border-gray-200 shadow-sm p-4 rounded-lg mb-4"
          >
            <div className="flex justify-between items-center">
              <p className="flex-1 text-base leading-6 font-medium text-gray-700 mb-4">
                Case {idx + 1}
              </p>

              {idx > 0 && !onlyRead && (
                <button
                  type="button"
                  className="text-gray-600"
                  onClick={handleRemoveCase(idx)}
                >
                  <TrashIcon className="w-5" />
                </button>
              )}
            </div>

            {isEdit && (
              <input
                type="hidden"
                name="id"
                {...register(`items.${idx}.id`, {
                  required: '',
                })}
              />
            )}

            <FormRow>
              <InputLabel title="Selecciona el case" inputId="caseId" />
              <MultipleSelectCasesField
                allCases={cases || []}
                selectedCases={casesInfo || []}
                fieldName={`items.${idx}.caseId`}
                {...{ register, idx, errors }}
              />
            </FormRow>

            <FormRow>
              <InputLabel title="Tipo de cerveza" inputId="caseContentId" />
              <SelectField
                id="caseContentId"
                name="caseContentId"
                errors={errors?.items?.[idx]}
                placeholder="Selecciona el sabor de la cerveza"
                disabled={onlyRead}
                inputProps={{
                  ...register(`items.${idx}.caseContentId`, {
                    required: 'Debes seleccionar un sabor',
                  }),
                }}
                options={casesContent.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </FormRow>

            <FormRow>
              <InputLabel
                title="Cantidad de litros (L)"
                inputId="contentQuantity"
              />
              <InputField
                type="text"
                placeholder="20"
                id="contentQuantity"
                name="contentQuantity"
                disabled={onlyRead}
                inputProps={{
                  ...register(`items.${idx}.contentQuantity`, {
                    required: 'Debes ingresar la cantidad de litros',
                    pattern: {
                      value: /^\d+$/,
                      message: 'Solo puedes introducir números',
                    },
                    min: {
                      value: 1,
                      message: `La cantidad mínima soportada es de 5 Litros`,
                    },
                    max: {
                      value: selectedCase.volume,
                      message: `La cantidad máxima que soporta este case es de ${selectedCase.volume} Litros`,
                    },
                  }),
                }}
                errors={errors?.items?.[idx]}
                highlight={
                  selectedCase?.volume
                    ? `La capacidad máxima del Case es de ${selectedCase?.volume} litros.`
                    : ''
                }
              />
            </FormRow>
          </div>
        );
      })}

      {!onlyRead && (
        <>
          <button
            type="button"
            className="bg-white border border-gray-200 shadow-sm p-4 rounded-lg flex items-center w-full text-sm leading-5 font-medium"
            onClick={() => append(INITIAL_CASE)}
          >
            <PlusSmIcon className="w-5 mr-1 text-gray-600" />
            <span className="text-gray-700">Agregar case</span>
          </button>

          <div className="w-full h-[1px] my-8 bg-gray-200" />

          <div className="w-2/5 mt-4 ml-auto">
            <Button type="submit" size={SM_SIZE}>
              {isEdit ? 'Terminar edición' : 'Crear orden'}
            </Button>
          </div>
        </>
      )}
    </form>
  );
}

export default OrderForm;
