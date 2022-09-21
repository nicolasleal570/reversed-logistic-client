import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import { Controller, useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { FormRow } from '@components/FormRow/FormRow';
import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';
import { fetchCaseInfoLastOutOfStock } from '@api/cases/methods';
import { StatusRadioGroup } from './StatusRadioGroup';
import { formatCustomerLocationName } from '@components/OrderForm/OrderForm';
import { useCases } from '@hooks/useCases';

export default function CheckCaseHealthModal({ isOpen, setIsOpen }) {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [cookies] = useCookies();
  const { handleCaseStateAfterPickupDone } = useCases();
  const [isLoading, setIsLoading] = useState(false);
  const [lastOutOfStock, setLastOutOfStock] = useState();

  function closeModal() {
    setIsOpen(false);
  }

  async function onSubmit(data) {
    const payload = {
      ...data,
      outOfStockItemId: lastOutOfStock.id,
    };
    await handleCaseStateAfterPickupDone(
      router.query.id,
      payload,
      cookies.token
    );
    closeModal();
    router.push(`/cases/${router.query.id}`);
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await fetchCaseInfoLastOutOfStock(
        router.query.id,
        cookies.token
      );
      setLastOutOfStock(res.data);
      setIsLoading(false);
    })();
  }, [cookies, router]);

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all space-y-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    ¿En que estado se encuentra el Case?
                  </Dialog.Title>

                  {isLoading || !lastOutOfStock ? (
                    <InputLabel title="Loading..." />
                  ) : (
                    <>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full"
                      >
                        <FormRow>
                          <InputLabel
                            title="Selecciona un estado"
                            inputId="currentStatus"
                          />
                          <Controller
                            control={control}
                            name="currentStatus"
                            rules={{ required: 'Debes seleccionar un estado' }}
                            render={({ field: { onChange, value, name } }) => {
                              return (
                                <>
                                  <StatusRadioGroup
                                    value={value}
                                    onChange={onChange}
                                    error={errors[name] || undefined}
                                  />
                                </>
                              );
                            }}
                          />
                        </FormRow>

                        <InputLabel title="Información extra" />
                        <div className="space-y-4">
                          <DataSection
                            label="Cliente que utilizó el case"
                            value={lastOutOfStock.order.customerLocation.name}
                            withoutMargins
                          />

                          <DataSection
                            label="Contenido que tenía/tiene el case"
                            value={lastOutOfStock.caseContent.name}
                            withoutMargins
                          />
                        </div>

                        <div className="mt-8 flex items-center justify-end">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                            onClick={closeModal}
                            disabled={isLoading}
                          >
                            Cancelar
                          </button>

                          <button
                            type="submit"
                            className="ml-2 inline-flex justify-center rounded border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                            disabled={isLoading}
                          >
                            Terminar
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
