import { Fragment, useState } from 'react';
import classNames from 'classnames';
import { Dialog, Transition } from '@headlessui/react';
import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';
import { BadgeCheckIcon } from '@heroicons/react/outline';
import { useCleanProcess } from '@hooks/useCleanProcess';
import { Badge } from '@components/Badge/Badge';

export function StepCard({ step, cleanProcessOrder, setCleanProcessOrder }) {
  const { setStepDoneCleanProcess } = useCleanProcess();
  const [showAlertModal, setShowAlertModal] = useState(false);

  const { status } = cleanProcessOrder;
  const { processStep: item, isDone, isCurrent } = step;

  return (
    <>
      <div
        className={classNames(
          'bg-white p-4 border border-gray-200 rounded mb-6'
        )}
      >
        <h3 className="flex items-center w-full text-md leading-7 font-medium">
          {isDone && (
            <span className="mr-1 text-green-500">
              <BadgeCheckIcon className="w-6 h-6" />
            </span>
          )}
          <span>Paso {step.order}</span>

          {isCurrent && (
            <div className="flex-1 flex items-center justify-end">
              <Badge title="Actual" color="green" size="small" />
            </div>
          )}
        </h3>
        <DataSection label="Nombre" value={item.name} />
        <DataSection label="Descripción" value={item.description} />
        <DataSection label="Instrucciones" value={item.instructions} />

        {status.value === 'IN_CLEAN_PROCESS' && !isDone && isCurrent && (
          <button
            type="button"
            className={classNames(
              'ml-auto flex items-center px-3 py-2 rounded-lg text-sm',
              {
                'border border-green-400 text-green-600 bg-white': !isDone,
              }
            )}
            onClick={async () => {
              setShowAlertModal(true);
            }}
          >
            <span>Marcar como listo</span>
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
                        Asegúrate de haber cumplido con todas las instrucciones
                        de limpieza antes de marcar este paso como listo.{' '}
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
                            // Finished
                            const { data: updatedCleanProcess } =
                              await setStepDoneCleanProcess(
                                cleanProcessOrder.id,
                                {
                                  stepId: step.id,
                                }
                              );
                            setCleanProcessOrder({
                              ...updatedCleanProcess,
                              steps: updatedCleanProcess.steps.sort(
                                (a, b) => a.order - b.order
                              ),
                            });
                            setShowAlertModal(false);
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
