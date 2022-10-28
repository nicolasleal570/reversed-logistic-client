import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/outline';

function Tooltip({ count }) {
  const text = count && count?.avg ? `${count?.avg} ${count?.format}` : '-';

  return (
    <div className="inline-block -mt-12">
      <p className="w-full flex items-center">
        <span>{text}</span>
        {count && count?.avg > 0 && (
          <ChevronDoubleUpIcon className="w-6 ml-1 text-green-400" />
        )}

        {count && count?.avg <= 0 && (
          <ChevronDoubleDownIcon className="w-6 ml-1 text-red-400" />
        )}

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
                  <h3 className="font-medium">Entrega final a tiempo</h3>
                  <p className="text-xs text-gray-600 mt-1.5">
                    Este KPI identifica la capacidad de los transportistas para
                    entregar a tiempo un producto al cliente final. <br />
                    <br /> Expresa la diferencia que hay entre la fecha estimada
                    de entrega de las órdenes y la fecha real en la que se
                    entregó el producto
                  </p>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </p>
    </div>
  );
}

export function TruckSummary({ truck, deliveryAtTime }) {
  return (
    <div className="w-full">
      <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
        Información sobre el vehículo
      </h2>
      <DataSection label="Marca" value={truck.brand} />
      <DataSection label="Modelo" value={truck.model} />
      <DataSection label="Tipo" value={truck.type} />
      <DataSection label="Placa" value={truck.licensePlate} />
      <DataSection label="Conductor" value={truck.driver?.fullName || '-'} />
      <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
        KPIs y analíticas
      </h2>
      <DataSection
        label="Rendimiento para entregas final a tiempo"
        value={!deliveryAtTime?.count ? '-' : undefined}
      />
      {deliveryAtTime?.count && <Tooltip count={deliveryAtTime?.count || {}} />}
    </div>
  );
}
