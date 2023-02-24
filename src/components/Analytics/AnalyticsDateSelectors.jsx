import { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { Dialog, Transition } from '@headlessui/react';
import { SelectField } from '@components/SelectField/SelectField';
import { InputField } from '@components/InputField/InputField';
import { Button } from '@components/Button/Button';
import { SM_SIZE } from '@components/Button/Button';
import { FormRow } from '@components/FormRow/FormRow';
import { InputLabel } from '@components/InputLabel/InputLabel';

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

const currentMonth = dayjs().month();
const currentYear = dayjs().year();

function FilterModal({ showModal, setShowModal, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      month: currentMonth,
      year: '',
    },
  });

  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShowModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Realiza una búsqueda más específica.
                </Dialog.Title>

                <form
                  className="mt-2 w-full"
                  onSubmit={handleSubmit((values) => {
                    setShowModal(false);
                    onSubmit(values);
                  })}
                >
                  <p className="text-sm text-gray-500 mb-5">
                    Filtra las métricas utilizando un mes o un año de interés.
                  </p>
                  <FormRow>
                    <InputLabel title="Selecciona un mes" inputId="month" />

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
                  </FormRow>

                  <FormRow>
                    <InputLabel
                      title="Ingresa el año (opcional)"
                      inputId="year"
                    />
                    <InputField
                      type="number"
                      placeholder="Ej. 2023"
                      name="year"
                      id="year"
                      inputProps={{
                        ...register('year'),
                      }}
                      errors={errors}
                    />
                  </FormRow>

                  <div className="w-full mt-4">
                    <div className="mt-8 flex items-center justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={() => setShowModal(false)}
                      >
                        Cancelar
                      </button>

                      <button
                        type="submit"
                        className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export function AnalyticsDateSelectors({ onSubmit }) {
  const [showModal, setShowModal] = useState(false);
  const [currentValues, setCurrentValues] = useState(null);

  return (
    <>
      <Button type="button" size={SM_SIZE} onClick={() => setShowModal(true)}>
        Filtrar
      </Button>

      {currentValues && (
        <>
          <p className="block my-2 text-sm text-gray-600">
            {currentValues?.month &&
            String(currentMonth) !== currentValues?.month
              ? `Mes seleccionado: ${months[currentValues?.month]}`
              : ''}
          </p>
          <p className="block text-sm text-gray-600">
            {currentValues?.year && String(currentYear) !== currentValues?.year
              ? `Año seleccionado: ${currentValues?.year}`
              : ''}
          </p>
        </>
      )}

      <FilterModal
        showModal={showModal}
        setShowModal={setShowModal}
        onSubmit={(values) => {
          setCurrentValues(values);
          onSubmit(values);
        }}
      />
    </>
  );
}
