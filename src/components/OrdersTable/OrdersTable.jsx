import React, { useEffect } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import Table from '@components/Table/Table';
import { PlusIcon, PencilIcon } from '@heroicons/react/outline';
import { Card } from '@components/Card/Card';
import { formatPrice } from '@utils/formatPrice';
import { Badge } from '@components/Badge/Badge';
import classNames from 'classnames';
import AssignShipmentModal from './AssignShipmentModal';
import { TakeOrderButton } from './TakeOrderButton';
import { fetchOrders } from '@api/orders/methods';

const header = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Fecha de orden',
    accessor: 'purchaseDate',
  },
  {
    Header: 'Total',
    accessor: 'total',
  },
  {
    Header: 'Creador por',
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

export function OrdersTable({ orders }) {
  const [data, setData] = React.useState([]);
  const [isShipmentModalOpen, setIsShipmentModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState();

  const renderRow = ({
    id,
    total,
    createdBy,
    assignedTo,
    orderStatus,
    purchaseDate,
    ...rest
  }) => ({
    id,
    purchaseDate: dayjs(purchaseDate).format('hh:mm A - dddd DD MMMM YYYY'),
    total: formatPrice(total),
    creator: createdBy?.fullName,
    assigned: assignedTo?.fullName ?? '-',
    status() {
      const { name, value } = orderStatus ?? {};
      return <Badge title={name ?? '-'} color={orderStatusColor[value]} />;
    },
    action() {
      return (
        <div className="flex items-center justify-end">
          <TakeOrderButton
            order={{
              id,
              total,
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
                    total,
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
    setData(orders.map(renderRow));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  return (
    <Card>
      <Table
        headers={header}
        content={data}
        href="/orders/create"
        as="/orders/create"
        text="Órdenes"
        tableHeader={
          <>
            <div className="flex flex-row flex-wrap w-full p-6">
              <h2 className="text-lg leading-7 font-medium text-gray-900 my-auto flex-1">
                Todas las órdenes
              </h2>

              <button
                type="button"
                className="border border-indigo-600 flex items-center px-4 py-2.5 rounded-lg text-indigo-600 mr-4"
                disabled={isLoading}
                onClick={async () => {
                  setIsLoading(true);
                  const { data: updatedOrders } = await fetchOrders();
                  setData(updatedOrders.map(renderRow));
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
          </>
        }
      />
      {isShipmentModalOpen && (
        <AssignShipmentModal
          isOpen={isShipmentModalOpen}
          setIsOpen={setIsShipmentModalOpen}
          selectedOrder={selectedOrder}
        />
      )}
    </Card>
  );
}
