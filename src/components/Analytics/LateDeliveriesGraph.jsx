import { Fragment } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import { Popover, Transition } from '@headlessui/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { Card } from '@components/Card/Card';
import Table from '@components/Table/Table';
import { Tooltip } from './Tooltip';

const header = [
  {
    Header: 'Orden',
    accessor: 'orderName',
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: 'Fecha esperada de entrega',
    accessor: 'expectedDeliveryDate',
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: 'Fecha real de entrega',
    accessor: 'deliveredAt',
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: '',
    accessor: 'actions',
    Cell: ({ row: { index }, data: _data }) => _data[index].actions(),
    disableFilters: true,
    disableSortBy: true,
  },
];

export function LateDeliveriesGraph({ lateDeliveries }) {
  const { lateDeliveries: data, orders, graph } = lateDeliveries;

  return (
    <Card className="p-0">
      <div className="p-4 flex items-center flex-col w-full border-b border-gray-200">
        <h2 className="flex items-center w-full text-lg leading-7 font-semibold">
          Entregas a destiempo
          <Tooltip
            title="Entregas a destiempo"
            description="Este KPI mide el número total de órdenes que no fueron entregadas a tiempo en el mes seleccionado."
          />
        </h2>

        <p className="block w-full text-sm py-1">
          <span>Órdenes totales: {orders.length}</span> |{' '}
          <span>Órdenes con retraso: {data.length}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-x">
        <div className="col-span-2">
          <Table
            headers={header}
            content={data.map((item) => ({
              ...item,
              orderName: `#OR${item.id}`,
              expectedDeliveryDate: dayjs(item.expectedDeliveryDate).format(
                'hh:mm A - dddd DD MMMM YYYY'
              ),
              deliveredAt: dayjs(item.deliveredAt).format(
                'hh:mm A - dddd DD MMMM YYYY'
              ),
              actions() {
                return (
                  <Link href="/orders/[id]" as={`/orders/${item.id}`}>
                    <a className="text-blue-500 text-xs font-medium rounded hover:ring-2 px-1.5 py-1">
                      <span>Examinar</span>
                    </a>
                  </Link>
                );
              },
            }))}
            deactivateSearchBar
            deactivatePagination
          />
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="w-[150px] h-[150px] m-6 rounded-full flex items-center justify-center flex-col border-8 border-indigo-400">
            <p className="text-6xl font-medium text-gray-700">{graph.count}</p>
            <p className="text-xs font-medium text-center text-gray-600">
              de retrasos en <br /> el mes
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
