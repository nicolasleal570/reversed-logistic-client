import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { Card } from '@components/Card/Card';

function Tooltip() {
  return (
    <Popover className="ml-9 relative">
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
        <Popover.Panel className="absolute mt-1 px-4 sm:px-0 w-80">
          <div className="overflow-hidden rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative bg-white p-3 max-w-xs">
              <h3 className="font-medium">Rotación de existencias</h3>
              <p className="text-xs text-gray-600 mt-1.5">
                Este KPI mide el número de veces que el inventario es renovado
                en un período de tiempo.
              </p>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export function StockRotationGraph({ count }) {
  return (
    <Card className="p-4 flex flex-col">
      <h2 className="flex items-center justify-between w-full text-lg leading-7 font-semibold mb-2">
        Rotación de existencias
        <Tooltip />
      </h2>

      <div className="flex flex-grow items-center">
        <div className=" flex items-center justify-center mx-auto w-16 h-16 rounded-full ring-indigo-500 ring-1">
          <p className="text-center text-3xl">{count || 0}</p>
        </div>
      </div>
    </Card>
  );
}
