import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { BadgeCheckIcon } from '@heroicons/react/solid';
import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';
import { useOrders } from '@hooks/useOrders';

export function OrderCard({ shipment, setShipment, order: item }) {
  const [cookies] = useCookies(['token']);
  const [order, setOrder] = useState({ ...item });
  const [showAlertModal, setShowAlertModal] = useState(false);
  const { updateOrder } = useOrders();

  const isDone = !!order.deliveredAt;

  useEffect(() => {
    if (item) {
      setOrder(item);
    }
  }, [item]);

  return (
    <>
      <div className="bg-white p-4 border border-gray-200 rounded mb-6">
        <h3 className="flex items-center justify-between w-full text-md leading-7 font-medium">
          {isDone && (
            <span className="mr-1 text-green-500">
              <BadgeCheckIcon className="w-6 h-6" />
            </span>
          )}
          <span>{`Orden #OR${order.id}`}</span>

          <Link href={`/orders/${order.id}`}>
            <a>
              <ExternalLinkIcon className="w-5 text-blue-500" />
            </a>
          </Link>
        </h3>
        <DataSection
          label="Cliente"
          value={order?.customerLocation?.customer?.companyName}
        />
        <DataSection label="Sucursal" value={order?.customerLocation?.name} />
        <DataSection
          label="Dirección"
          value={`${order?.customerLocation?.line1}, ${order?.customerLocation?.city}. ${order?.customerLocation?.state}, ${order?.customerLocation?.country}`}
        />

        {!order.deliveredAt &&
          !isDone &&
          shipment.status.value !== 'SHIPMENT_DONE' && (
            <button
              type="button"
              className={classNames(
                'ml-auto flex items-center px-3 py-2 rounded-lg text-sm disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-400',
                {
                  'border border-green-400 text-green-600 bg-white': !isDone,
                }
              )}
              onClick={async () => {
                if (shipment.status.value === 'IN_SHIPMENT') {
                  setShowAlertModal(true);
                }
              }}
              disabled={shipment.status.value !== 'IN_SHIPMENT'}
            >
              <span>Marcar como entregada</span>
            </button>
          )}
      </div>

      {showAlertModal && (
        <Transition appear show={showAlertModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={setShowAlertModal}
          >
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
                      ¿Seguro que quieres continuar?
                    </Dialog.Title>

                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Asegúrate de haber entregado el pedido al cliente
                        correcto antes de continuar.{' '}
                        <span className="text-red-500 font-medium">
                          ESTA ACCIÓN NO PUEDE DESHACERSE.
                        </span>
                      </p>
                    </div>

                    <div className="w-full mt-4">
                      <div className="mt-8 flex items-center justify-end">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                          onClick={() => setShowAlertModal(false)}
                        >
                          Cancelar
                        </button>

                        <button
                          type="button"
                          className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                          onClick={async () => {
                            if (shipment.status.value === 'IN_SHIPMENT') {
                              try {
                                setShowAlertModal(false);
                                const { data: updatedOrder } =
                                  await updateOrder(
                                    order.id,
                                    {
                                      ...order,
                                      deliveredAt: dayjs(),
                                    },
                                    cookies.token
                                  );
                                setOrder(updatedOrder);
                                setShipment((oldShipment) => {
                                  const newOrders = [
                                    ...oldShipment.orders,
                                  ].filter(
                                    (order) => order.id !== updatedOrder.id
                                  );

                                  newOrders.push(updatedOrder);

                                  return {
                                    ...oldShipment,
                                    orders: newOrders,
                                  };
                                });
                              } catch (error) {
                                console.log(error);
                              }
                            }
                          }}
                        >
                          Continuar
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
}
