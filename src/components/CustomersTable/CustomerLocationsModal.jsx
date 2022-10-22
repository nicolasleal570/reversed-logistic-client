import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useCookies } from 'react-cookie';
import { fetchCustomerLocationsByCustomer } from '@api/customers/methods';
import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';

function ModalBody({ data, closeModal }) {
  return (
    <Dialog.Panel className="w-full max-w-md lg:max-w-[700px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Sucursales del cliente {data.customer.companyName}
      </Dialog.Title>

      <div className="w-full mt-4">
        {data.locations.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 pb-0 border border-gray-200 rounded mb-6"
          >
            <h3 className="block w-full text-md leading-7 font-medium">
              {item.name}
            </h3>

            <DataSection
              label="Dirección"
              value={`${item.line1}, ${item.city}. ${item.state}, ${item.country}`}
            />

            <DataSection label="Contacto" value={item.contact} />

            <DataSection
              label="Email asignado para reportar cases"
              value={item.email}
            />

            <DataSection label="Código postal" value={item.zipCode} />
          </div>
        ))}

        <div className="mt-8 flex items-center justify-end">
          <button
            type="button"
            className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            Cerrar
          </button>
        </div>
      </div>
    </Dialog.Panel>
  );
}

export function CustomerLocationsModal({
  isOpen,
  setIsOpen,
  selectedCustomerId,
}) {
  const [cookies] = useCookies();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetchCustomerLocationsByCustomer(
          selectedCustomerId,
          cookies.token
        );
        setData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [cookies, selectedCustomerId]);

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
                {isLoading || !data ? (
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Cargando...
                    </Dialog.Title>
                  </Dialog.Panel>
                ) : (
                  <ModalBody {...{ closeModal, data }} />
                )}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
