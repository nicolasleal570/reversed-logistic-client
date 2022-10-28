import { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { QuestionMarkCircleIcon, SearchIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { Card } from '@components/Card/Card';
import { SelectField } from '@components/SelectField/SelectField';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { FormRow } from '@components/FormRow/FormRow';
import { fetchShipmentsCount } from '@api/analytics/methods';
import dayjs from 'dayjs';

function Tooltip() {
  return (
    <Popover className="ml-9">
      <Popover.Button
        className={`
                group inline-flex items-center pl-2 py-1 text-base font-medium focus:outline-none`}
      >
        <QuestionMarkCircleIcon className="w-5 text-gray-600" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute mt-1 px-4 sm:px-0">
          <div className="overflow-hidden rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative bg-white p-3 max-w-xs">
              <h3 className="font-medium">Número final de envíos</h3>
              <p className="text-xs text-gray-600 mt-1.5">
                Este KPI mide la cantidad de pedidos que envía la empresa en un
                período de tiempo determinado. En este caso se mide para un mes
                determinado.
              </p>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export function CountOrdersGraph() {
  const currentMonth = dayjs().month();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      month: currentMonth,
    },
  });
  const [cookies] = useCookies(['token']);
  const [isLoading, setIsLoading] = useState(false);
  const [graphInfo, setGraphInfo] = useState({});

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const { data } = await fetchShipmentsCount(values.month, cookies.token);
      setGraphInfo(data.graph);
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Card className="p-4">
      <h2 className="flex items-center justify-between w-full text-lg leading-7 font-semibold mb-2">
        Número de envíos
        <Tooltip />
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <FormRow>
          <InputLabel title="Selecciona un mes" inputId="month" />

          <div className="flex">
            <div className="w-full">
              <SelectField
                id="month"
                name="month"
                errors={errors}
                placeholder="Selecciona un mes"
                inputProps={{
                  ...register('month', {
                    required: 'Debes seleccionar un mes para buscar',
                  }),
                }}
                options={months.map((month, idx) => ({
                  label: month,
                  value: idx,
                }))}
              />
            </div>
            <button
              type="submit"
              className="h-10 px-4 shadow-sm rounded-lg cursor-pointer ml-2 bg-indigo-600 text-white"
              disabled={isLoading}
            >
              <SearchIcon className="w-4" />
            </button>
          </div>
        </FormRow>
      </form>

      {isLoading ? (
        <p className="text-center text-xl">Cargando...</p>
      ) : (
        <div className="flex items-center justify-center mx-auto w-16 h-16 rounded-full ring-indigo-500 ring-1">
          <p className="text-center text-3xl">{graphInfo.count || 0}</p>
        </div>
      )}
    </Card>
  );
}
