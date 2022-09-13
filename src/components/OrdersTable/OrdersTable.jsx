import React, { useEffect } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import Table from '@components/Table/Table';
import { PlusIcon, PencilIcon } from '@heroicons/react/outline';
import { Card } from '@components/Card/Card';
import { formatPrice } from '@utils/formatPrice';
import { useUser } from '@hooks/useUser';
import { useOrders } from '@hooks/useOrders';
import { Badge } from '@components/Badge/Badge';
import classNames from 'classnames';

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

const orderStatusColor = {
  1: 'blue',
  2: 'orange',
  3: 'violet',
  4: 'cyan',
  5: 'green',
  6: 'red',
};

export function OrdersTable({ orders }) {
  const { user } = useUser();
  const { takeOrder } = useOrders(user);
  const [data, setData] = React.useState([]);

  const renderRow = (
    { id, total, createdBy, assignedTo, orderStatus, purchaseDate },
    index
  ) => ({
    id,
    purchaseDate: dayjs(purchaseDate).format('hh:mm A - dddd DD MMMM YYYY'),
    total: formatPrice(total),
    creator: createdBy?.fullName,
    assigned: assignedTo?.fullName ?? '-',
    status() {
      const { name, id: orderId } = orderStatus ?? {};
      return <Badge title={name ?? '-'} color={orderStatusColor[orderId]} />;
    },
    action() {
      return (
        <div className="flex items-center">
          {orderStatus?.id === 1 && (
            <button
              type="button"
              className="ml-auto border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
              onClick={async () => {
                const updatedOrder = await takeOrder(id);
                changeOrderInfo(index, updatedOrder.data);
              }}
            >
              <span>Tomar orden</span>
            </button>
          )}
          {orderStatus?.id === 3 && (
            <button
              type="button"
              className="ml-auto border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
              onClick={async () => {
                //const updatedOrder = await takeOrder(id);
                console.log('ASIGNAR');
              }}
            >
              <span>Asignar envío</span>
            </button>
          )}

          <Link href="/orders/[id]" as={`/orders/${id}`}>
            <a
              className={classNames('text-gray-900 p-1', {
                'ml-auto': orderStatus?.id > 1,
              })}
            >
              <PencilIcon className="w-5" />
              <span className="sr-only">Editar</span>
            </a>
          </Link>
        </div>
      );
    },
  });

  const changeOrderInfo = (index, order) => {
    setData(() =>
      [...orders.slice(0, index), { ...order }, ...orders.slice(index + 1)].map(
        (item, index) => {
          return renderRow(item, index);
        }
      )
    );
  };

  useEffect(() => {
    setData(orders.map(renderRow));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, user]);

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
    </Card>
  );
}
