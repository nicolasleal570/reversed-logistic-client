import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useCookies } from 'react-cookie';
import { Card } from '@components/Card/Card';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { FormRow } from '@components/FormRow/FormRow';
import { SelectField } from '@components/SelectField/SelectField';
import { fetchOrdersByCustomerLocations } from '@api/analytics/methods';

export function OrdersByCustomerLocationsGraph({ customers }) {
  const [cookies] = useCookies(['token']);
  const [ordersByCustomerLocations, setOrdersByCustomerLocations] = useState();
  const { data, name } = ordersByCustomerLocations ?? {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const { data: ordersByCustomerLocationsData } =
        await fetchOrdersByCustomerLocations(values.customerId, cookies.token);
      setOrdersByCustomerLocations(ordersByCustomerLocationsData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log({ error });
    }
  };

  return (
    <Card className="p-4">
      <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
        {name
          ? `Total de órdenes realizadas por el cliente "${name}" y sus sucursales`
          : 'Total de órdenes realizadas por un cliente y sus sucursales'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:w-1/2 mb-8">
        <FormRow>
          <InputLabel title="Selecciona un cliente" inputId="customerId" />

          <div className="flex">
            <div>
              <SelectField
                id="customerId"
                name="customerId"
                errors={errors}
                placeholder="Selecciona un cliente"
                highlight="Seleccionando un cliente para ejecutar la búsqueda"
                disabled={isLoading}
                inputProps={{
                  ...register('customerId', {
                    required: 'Debes seleccionar un cliente para buscar',
                  }),
                }}
                options={customers.map((customer) => ({
                  label: customer.companyName,
                  value: customer.id,
                }))}
              />
            </div>
            <button
              type="submit"
              className="h-10 px-4 shadow-sm rounded-lg cursor-pointer ml-2 bg-indigo-600 text-white"
            >
              Buscar
            </button>
          </div>
        </FormRow>
      </form>

      {data && data?.length > 0 ? (
        <ResponsiveContainer width={'100%'} height={300}>
          <BarChart data={data.map((item) => ({ ...item, Total: item.count }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Total" fill="rgb(251 146 60)" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <h2 className="block w-full text-xl text-center my-12">
          {name
            ? 'No hay data'
            : 'Selecciona un cliente para visualizar los datos'}
        </h2>
      )}
    </Card>
  );
}
