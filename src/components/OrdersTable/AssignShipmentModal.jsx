import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { SelectField } from '@components/SelectField/SelectField';
import { FormRow } from '@components/FormRow/FormRow';
import { fetchShipments } from '@api/shipments/methods';
import { useOrders } from '@hooks/useOrders';
import { useCookies } from 'react-cookie';

export default function AssignShipmentModal({
  isOpen,
  setIsOpen,
  selectedOrder,
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [cookies] = useCookies();
  const { assignShipmentToOrder } = useOrders();
  const [shipments, setShipments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  async function onSubmit(data) {
    setIsLoading(true);
    const { data: updatedOrder } = await assignShipmentToOrder({
      orderId: selectedOrder.id,
      ...data,
    });
    closeModal();
    router.push(`/orders/${updatedOrder.id}`);
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await fetchShipments(cookies.token, { status: 'AVAILABLE' });
      setShipments(res.data);
      setIsLoading(false);
    })();
  }, [cookies]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    Asigna un envío a la órden &quot;
                    <span className="font-bold">{`OR${selectedOrder.id}`}</span>
                    &quot;
                  </Dialog.Title>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full mt-4"
                  >
                    <FormRow>
                      <InputLabel
                        title="Selecciona uno de los envíos disponibles"
                        inputId="shipmentId"
                      />
                      <SelectField
                        id="shipmentId"
                        name="shipmentId"
                        errors={errors}
                        placeholder="Selecciona un envío"
                        disabled={isLoading}
                        inputProps={{
                          ...register('shipmentId', {
                            required: 'Debes seleccionar un envío',
                          }),
                        }}
                        options={shipments.map((item) => ({
                          label: `Envío - ${item.trackNumber.toUpperCase()}`,
                          value: item.id,
                        }))}
                      />
                    </FormRow>

                    <div className="mt-8 flex items-center justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                        disabled={isLoading}
                      >
                        Cancelar
                      </button>

                      <button
                        type="submit"
                        className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                        disabled={isLoading}
                      >
                        Asignar envío
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
