import React, { useEffect } from 'react';
import Link from 'next/link';
import Table from '@components/Table/Table';
import { PlusIcon, PencilIcon, UploadIcon } from '@heroicons/react/outline';
import { Card } from '@components/Card/Card';

const header = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Total',
    accessor: 'total',
  },
  {
    Header: 'Creador por',
    accessor: 'creator',
    Cell: ({ row: { index }, data: _data }) => _data[index].creator(),
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

export function OrdersTable({ orders }) {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    setData(
      orders.map(({ id, total, createdBy, orderStatus }) => ({
        id,
        total,
        creator() {
          return createdBy.fullName;
        },
        status() {
          return (
            <p className="inline-flex items-center bg-indigo-50 px-2 py-0.5 rounded-full text-indigo-600">
              <span className="block bg-indigo-600 w-1.5 h-1.5 rounded-full mr-2" />
              {orderStatus.name}
            </p>
          );
        },
        action() {
          return (
            <Link href="/orders/[_id]" as={`/orders/${id}`}>
              <a className="text-gray-900 p-1 float-right">
                <PencilIcon className="w-5" />
                <span className="sr-only">Editar</span>
              </a>
            </Link>
          );
        },
      }))
    );
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

              <Link href="/orders/create">
                <a
                  type="button"
                  className="bg-indigo-600 flex items-center px-4 py-2.5 rounded-lg text-white"
                >
                  <PlusIcon className="w-5 mr-1" />
                  <span>Nueva orden</span>
                </a>
              </Link>

              <button
                type="button"
                className="ml-3 bg-white border border-gray-300 flex items-center px-4 py-2.5 rounded-lg text-gray-700"
              >
                <UploadIcon className="w-5 mr-1" />
                <span>Importar</span>
              </button>
            </div>
          </>
        }
      />
    </Card>
  );
}
