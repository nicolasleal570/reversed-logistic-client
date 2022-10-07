import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dayjs from 'dayjs';
import Table from '@components/Table/Table';
import { PencilIcon } from '@heroicons/react/outline';
import { Card } from '@components/Card/Card';
import { Badge } from '@components/Badge/Badge';
import classNames from 'classnames';
import { fetchOutOfStockOrders } from '@api/out-of-stock/methods';
import { useOutOfStockOrders } from '@hooks/useOutOfStockOrders';
import { FilterPillTable } from '@components/FilterPillTable/FilterPillTable';

const header = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Fecha de comienzo de la recogida',
    accessor: 'pickedUpAtDate',
  },
  {
    Header: 'Fecha de entrega al almacén',
    accessor: 'doneAtDate',
  },
  {
    Header: 'Nro de cases',
    accessor: 'itemsLength',
  },
  {
    Header: 'Estatus',
    accessor: 'status',
    Cell: ({ row: { index }, data: _data }) => _data[index].status(),
  },
  {
    Header: 'Acciones',
    accessor: 'action',
    Cell: ({ row: { index }, data: _data }) => _data[index].action(),
    disableFilters: true,
    disableSortBy: true,
  },
];

export const outOfStockOrderStatusColor = {
  OUT_OF_STOCK: 'red',
  PICKUP_IN_PROGRESS: 'orange',
  PICKUP_DONE: 'green',
};

export function OutOfStockOrdersTable({
  outOfStockOrders: rawData,
  filterTabs,
}) {
  const router = useRouter();
  const { takeOutOfStockOrder, finishOutOfStockOrder } = useOutOfStockOrders();
  const [data, setData] = React.useState([]);
  const [outOfStockOrders, setOutOfStockOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentTab, setCurrentTab] = useState('ALL');

  const renderRow = ({
    id,
    status: orderStatus,
    pickedUpAt,
    doneAt,
    items,
  }) => ({
    id,
    itemsLength: items.length,
    pickedUpAtDate: pickedUpAt
      ? dayjs(pickedUpAt).format('hh:mm A - dddd DD MMMM YYYY')
      : '-',
    doneAtDate: doneAt
      ? dayjs(doneAt).format('hh:mm A - dddd DD MMMM YYYY')
      : '-',
    status() {
      const { name, value } = orderStatus ?? {};
      return (
        <Badge title={name ?? '-'} color={outOfStockOrderStatusColor[value]} />
      );
    },
    action() {
      return (
        <div className="flex items-center justify-end">
          {orderStatus?.value === 'OUT_OF_STOCK' && (
            <>
              <button
                type="button"
                className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
                onClick={async () => {
                  await takeOutOfStockOrder({ id });
                  router.push(`/out-of-stock-orders`);
                }}
              >
                <span>Comenzar recogida</span>
              </button>
            </>
          )}

          {orderStatus?.value === 'PICKUP_IN_PROGRESS' && (
            <>
              <button
                type="button"
                className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
                onClick={async () => {
                  await finishOutOfStockOrder({ id });
                  router.push(`/out-of-stock-orders`);
                }}
              >
                <span>Entregar recogida</span>
              </button>
            </>
          )}

          {orderStatus?.value === 'PICKUP_DONE' &&
            items.filter((elem) => !elem.finished).length > 0 && (
              <>
                <button
                  type="button"
                  className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
                  onClick={async () => {
                    router.push(`/cases`);
                  }}
                >
                  <span>Examinar cases</span>
                </button>
              </>
            )}

          <Link
            href="/out-of-stock-orders/[id]"
            as={`/out-of-stock-orders/${id}`}
          >
            <a className={classNames('text-gray-900 p-1')}>
              <PencilIcon className="w-5" />
              <span className="sr-only">Editar</span>
            </a>
          </Link>
        </div>
      );
    },
  });

  useEffect(() => {
    setData(outOfStockOrders.map(renderRow));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outOfStockOrders]);

  useEffect(() => {
    if (currentTab !== 'ALL') {
      setOutOfStockOrders(
        rawData.filter((item) => item.status.value === currentTab)
      );
    } else {
      setOutOfStockOrders([...rawData]);
    }
  }, [rawData, currentTab]);

  return (
    <>
      <FilterPillTable
        tabs={filterTabs}
        currentTab={currentTab}
        onClick={(value) =>
          value ? setCurrentTab(value) : setCurrentTab('ALL')
        }
      />

      <Card>
        <Table
          headers={header}
          content={data}
          href="/out-of-stock-orders/create"
          as="/out-of-stock-orders/create"
          text="Órdenes"
          tableHeader={
            <>
              <div className="flex flex-col lg:flex-row flex-wrap w-full p-6">
                <h2 className="text-lg leading-7 font-medium text-gray-900 my-auto flex-1 mb-4 g:mb-0">
                  Todas las órdenes de agotamiento
                </h2>

                <button
                  type="button"
                  className="border border-indigo-600 flex items-center px-4 py-2.5 rounded-lg text-indigo-600 mr-4"
                  disabled={isLoading}
                  onClick={async () => {
                    setIsLoading(true);
                    const { data: updatedOrders } =
                      await fetchOutOfStockOrders();
                    setData(updatedOrders.map(renderRow));
                    setIsLoading(false);
                  }}
                >
                  <span>Actualizar lista</span>
                </button>
              </div>
            </>
          }
        />
      </Card>
    </>
  );
}
