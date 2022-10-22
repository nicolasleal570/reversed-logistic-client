import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import Table from '@components/Table/Table';
import { PlusIcon, PencilIcon } from '@heroicons/react/outline';
import { Card } from '@components/Card/Card';
import { Badge } from '@components/Badge/Badge';
import classNames from 'classnames';
import { fetchOrders } from '@api/orders/methods';
import { FilterPillTable } from '@components/FilterPillTable/FilterPillTable';
import AssignShipmentModal from './AssignShipmentModal';
import { TakeOrderButton } from './TakeOrderButton';

const header = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Fecha de creación',
    accessor: 'purchaseDate',
  },
  {
    Header: 'Cliente',
    accessor: 'customer',
  },
  {
    Header: 'Creado por',
    accessor: 'creator',
  },
  {
    Header: 'Asignado a',
    accessor: 'assigned',
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

export const orderStatusColor = {
  QUEUED: 'blue',
  IN_TRANSIT: 'orange',
  FINISHED: 'violet',
  WAITING_SHIPMENT: 'yellow',
  IN_SHIPMENT: 'cyan',
  SHIPMENT_DONE: 'green',
  CANCELLED: 'red',
};

export function OrdersTable({
  orders: ordersRawData,
  onlyTable,
  filterTabs = [],
}) {
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isShipmentModalOpen, setIsShipmentModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();
  const [currentTab, setCurrentTab] = useState('ALL');

  const renderRow = ({
    id,
    createdBy,
    assignedTo,
    orderStatus,
    purchaseDate,
    customerLocation,
    ...rest
  }) => ({
    id,
    purchaseDate: dayjs(purchaseDate).format('hh:mm A - dddd DD MMMM YYYY'),
    customer: customerLocation?.name ?? '-',
    creator: createdBy?.fullName,
    assigned: assignedTo?.fullName ?? '-',
    status() {
      const { name, value } = orderStatus ?? {};
      return name ? (
        <Badge title={name} color={orderStatusColor[value]} />
      ) : (
        '-'
      );
    },
    action() {
      return (
        <div className="flex items-center justify-end">
          <TakeOrderButton
            order={{
              id,
              createdBy,
              assignedTo,
              orderStatus,
              purchaseDate,
              ...rest,
            }}
          />

          {orderStatus?.id === 3 && (
            <>
              <button
                type="button"
                className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
                onClick={async () => {
                  setIsShipmentModalOpen(true);
                  setSelectedOrder({
                    id,
                    createdBy,
                    assignedTo,
                    orderStatus,
                    purchaseDate,
                    ...rest,
                  });
                }}
              >
                <span>Asignar envío</span>
              </button>
            </>
          )}

          <Link href="/orders/[id]" as={`/orders/${id}`}>
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
    if (currentTab !== 'ALL') {
      setOrders(
        ordersRawData.filter((item) => item.orderStatus.value === currentTab)
      );
    } else {
      setOrders([...ordersRawData]);
    }
  }, [ordersRawData, currentTab]);

  useEffect(() => {
    setData(orders.map(renderRow));
  }, [orders]);

  return (
    <>
      {filterTabs.length > 0 && (
        <FilterPillTable
          tabs={filterTabs}
          currentTab={currentTab}
          onClick={(value) =>
            value ? setCurrentTab(value) : setCurrentTab('ALL')
          }
        />
      )}

      <Card>
        <Table
          headers={header}
          content={data}
          href="/orders/create"
          as="/orders/create"
          text="Órdenes"
          deactivateSearchBar
          tableHeader={
            <>
              {!onlyTable && (
                <div className="flex flex-col lg:flex-row flex-wrap w-full p-6">
                  <h2 className="text-lg leading-7 font-medium text-gray-900 my-auto flex-1 mb-4 g:mb-0">
                    Todas las órdenes
                  </h2>

                  <button
                    type="button"
                    className="border border-indigo-600 flex items-center px-4 py-2.5 rounded-lg text-indigo-600 lg:mr-4 mb-4 lg:mb-0"
                    disabled={isLoading}
                    onClick={async () => {
                      setIsLoading(true);
                      const { data: updatedOrders } = await fetchOrders();
                      setData(updatedOrders.map(renderRow));
                      setCurrentTab('ALL');
                      setIsLoading(false);
                    }}
                  >
                    <span>Actualizar lista</span>
                  </button>

                  <Link href="/orders/create">
                    <a className="bg-indigo-600 flex items-center px-4 py-2.5 rounded-lg text-white">
                      <PlusIcon className="w-5 mr-1" />
                      <span>Nueva orden</span>
                    </a>
                  </Link>
                </div>
              )}
            </>
          }
        />
        {isShipmentModalOpen && (
          <AssignShipmentModal
            isOpen={isShipmentModalOpen}
            setIsOpen={setIsShipmentModalOpen}
            selectedOrder={selectedOrder}
            setOrder={(order) => {
              setData((oldData) => {
                const idx = oldData.findIndex((item) => item.id === order.id);

                return [
                  ...oldData.slice(0, idx),
                  { ...renderRow(order) },
                  ...oldData.slice(idx + 1),
                ];
              });
            }}
          />
        )}
      </Card>
    </>
  );
}
