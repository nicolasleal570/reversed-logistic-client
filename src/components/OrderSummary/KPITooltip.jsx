import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/outline';

export function KPITooltip() {
  return (
    <Popover className="ml-9">
      <Popover.Button
        className={`
                group inline-flex items-center px-2 py-1 text-base font-medium focus:outline-none`}
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
              <h3 className="font-medium">Tiempo de espera de la orden</h3>
              <p className="text-xs text-gray-600 mt-1.5">
                Este KPI determina el tiempo que le toma a los clientes recibir
                el producto una vez creada la orden.
              </p>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
