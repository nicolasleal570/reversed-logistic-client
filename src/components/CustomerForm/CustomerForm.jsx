import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { PlusSmIcon, TrashIcon } from '@heroicons/react/outline';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { InputField } from '@components/InputField/InputField';
import { FormRow } from '@components/FormRow/FormRow';
import { Button, SM_SIZE } from '@components/Button/Button';
import { useRouter } from 'next/router';
import { useCustomers } from '@hooks/useCustomers';

const INITIAL_LOCATION = {
  name: '',
  line1: '',
  zipCode: '',
  city: '',
  state: '',
  contact: '',
  country: 'Venezuela',
};

function CustomerForm({ isEdit = false, onlyRead = false, customer, token }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      locations: [INITIAL_LOCATION],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'locations',
  });
  const { createCustomer, updateCustomer } = useCustomers();

  const handleRemoveCase = (idx) => () => {
    const locations = getValues('locations');
    if (locations.length > 1) {
      remove(idx);
    }
  };

  const handleOnFinishUpdate = () => {
    router.push('/customers');
  };

  const onSubmit = async (data) => {
    if (!isEdit) {
      createCustomer(data, token);
    } else {
      updateCustomer(customer.id, data, token, handleOnFinishUpdate);
    }
  };

  useEffect(() => {
    if (customer) {
      setValue('companyName', customer.companyName);
      setValue('description', customer.description);
      setValue('rif', customer.rif);
      setValue('website', customer.website);
      setValue(
        'locations',
        customer.locations.map((item) => {
          const {
            id: locationId,
            name,
            line1,
            zipCode,
            city,
            state,
            contact,
            email,
            country,
          } = item;
          return {
            id: locationId,
            name,
            line1,
            zipCode,
            city,
            state,
            state,
            contact,
            email,
            country,
          };
        })
      );
    }
  }, [customer, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm md:w-96">
      <h2 className="w-full text-lg leading-7 font-medium mb-8">
        Información básica
      </h2>

      <FormRow>
        <InputLabel title="Nombre del cliente/empresa" inputId="companyName" />
        <InputField
          id="companyName"
          name="companyName"
          errors={errors}
          placeholder="Fresh Fish C.A"
          disabled={onlyRead}
          inputProps={{
            ...register('companyName', {
              required: 'Debes ingresar el nombre del cliente/empresa',
            }),
          }}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Descripción" inputId="description" />
        <InputField
          id="description"
          name="description"
          errors={errors}
          disabled={onlyRead}
          inputProps={{
            ...register('description'),
          }}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Rif" inputId="rif" />
        <InputField
          id="rif"
          name="rif"
          errors={errors}
          disabled={onlyRead}
          inputProps={{
            ...register('rif', {
              required: 'Debes ingresar el rif del cliente/empresa',
            }),
          }}
        />
      </FormRow>

      <FormRow>
        <InputLabel title="Página web" inputId="website" />
        <InputField
          id="website"
          name="website"
          errors={errors}
          placeholder="https://google.com"
          disabled={onlyRead}
          inputProps={{
            ...register('website'),
          }}
        />
      </FormRow>

      <div className="w-full h-[1px] my-8 bg-gray-200" />

      <h2 className="w-full text-lg leading-7 font-medium mb-8">Sucursales</h2>

      {fields.map((field, idx) => (
        <div
          key={field.id}
          className="bg-white border border-gray-200 shadow-sm p-4 rounded-lg mb-4"
        >
          <div className="flex justify-between items-center">
            <p className="flex-1 text-base leading-6 font-medium text-gray-700 mb-4">
              Sucursal {idx + 1}
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
              {...register(`locations.${idx}.id`, {
                required: '',
              })}
            />
          )}

          <FormRow>
            <InputLabel title="Nombre de la sucursal" inputId="name" />
            <InputField
              id="name"
              name="name"
              placeholder="Fresh Fish La Castellana"
              disabled={onlyRead}
              inputProps={{
                ...register(`locations.${idx}.name`, {
                  required: 'Debes ingresar el nombre de la sucursal',
                }),
              }}
              errors={errors?.locations?.[idx]}
            />
          </FormRow>

          <FormRow>
            <InputLabel title="Contacto del cliente" inputId="contact" />
            <InputField
              type="text"
              placeholder="Email o teléfono"
              id="contact"
              name="contact"
              disabled={onlyRead}
              inputProps={{
                ...register(`locations.${idx}.contact`, {
                  required: 'Debes ingresar un contacto de la empresa',
                }),
              }}
              errors={errors?.locations?.[idx]}
            />
          </FormRow>

          <FormRow>
            <InputLabel title="Email para reportar cases" inputId="email" />
            <InputField
              type="text"
              placeholder="john@email.com"
              id="email"
              name="email"
              disabled={onlyRead}
              inputProps={{
                ...register(`locations.${idx}.email`, {
                  required:
                    'Debes ingresar un email para que la sucursal reporte los cases que se agotan',
                }),
              }}
              errors={errors?.locations?.[idx]}
            />
          </FormRow>

          <FormRow>
            <InputLabel title="Dirección" inputId="line1" />
            <InputField
              type="text"
              placeholder="Avenida francisco de miranda, edificio Parque cristal"
              id="line1"
              name="line1"
              disabled={onlyRead}
              inputProps={{
                ...register(`locations.${idx}.line1`, {
                  required: 'Debes ingresar una dirección',
                }),
              }}
              errors={errors?.locations?.[idx]}
            />
          </FormRow>

          <FormRow>
            <InputLabel title="Estado" inputId="state" />
            <InputField
              type="text"
              placeholder="Miranda"
              id="state"
              name="state"
              disabled={onlyRead}
              inputProps={{
                ...register(`locations.${idx}.state`, {
                  required: 'Debes ingresar un estado',
                }),
              }}
              errors={errors?.locations?.[idx]}
            />
          </FormRow>

          <FormRow>
            <InputLabel title="Código postal" inputId="zipCode" />
            <InputField
              type="text"
              id="zipCode"
              name="zipCode"
              disabled={onlyRead}
              inputProps={{
                ...register(`locations.${idx}.zipCode`, {
                  required: 'Debes ingresar el código postal',
                }),
              }}
              errors={errors?.locations?.[idx]}
            />
          </FormRow>

          <FormRow>
            <InputLabel title="Ciudad" inputId="city" />
            <InputField
              type="text"
              placeholder="Caracas"
              id="city"
              name="city"
              disabled={onlyRead}
              inputProps={{
                ...register(`locations.${idx}.city`, {
                  required: 'Debes ingresar la ciudad',
                }),
              }}
              errors={errors?.locations?.[idx]}
            />
          </FormRow>
        </div>
      ))}

      {!onlyRead && (
        <>
          <button
            type="button"
            className="bg-white border border-gray-200 shadow-sm p-4 rounded-lg flex items-center w-full text-sm leading-5 font-medium"
            onClick={() => append(INITIAL_LOCATION)}
          >
            <PlusSmIcon className="w-5 mr-1 text-gray-600" />
            <span className="text-gray-700">Agregar sucursal</span>
          </button>

          <div className="w-full h-[1px] my-8 bg-gray-200" />

          <div className="w-2/5 mt-4 ml-auto">
            <Button type="submit" size={SM_SIZE}>
              {isEdit ? 'Terminar edición' : 'Crear cliente'}
            </Button>
          </div>
        </>
      )}
    </form>
  );
}

export default CustomerForm;
