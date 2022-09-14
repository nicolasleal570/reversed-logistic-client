import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import Table from '@components/Table/Table';
import { PlusIcon, PencilIcon } from '@heroicons/react/outline';
import { Card } from '@components/Card/Card';
import { Badge } from '@components/Badge/Badge';
// import { availableCasesState } from '@constants/availableCasesState';

const header = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Identificador de tracking',
    accessor: 'trackNumber',
  },
  {
    Header: 'Fecha de envío',
    accessor: 'shipmentAt',
  },
  {
    Header: 'Fecha de entrega',
    accessor: 'deliveredAt',
  },
  {
    Header: 'Estado',
    accessor: 'status',
    Cell: ({ row: { index }, data: _data }) => _data[index].status(),
  },
  {
    Header: 'Detalles',
    accessor: 'details',
  },
  {
    Header: 'Creado por',
    accessor: 'createdByName',
  },
  {
    Header: 'Acciones',
    accessor: 'action',
    Cell: ({ row: { index }, data: _data }) => _data[index].action(),
    disableFilters: true,
    disableSortBy: true,
  },
];

export function ShipmentsTable({ shipments }) {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    setData(
      shipments.map(({ id, trackNumber, details, shipmentAt, deliveredAt }) => {
        return {
          id,
          trackNumber: trackNumber.toUpperCase(),
          details: details ?? '-',
          shipmentAt:
            shipmentAt !== null
              ? dayjs(shipmentAt).format('hh:mm A - dddd DD MMMM YYYY')
              : '-',
          deliveredAt:
            deliveredAt !== null
              ? dayjs(deliveredAt).format('hh:mm A - dddd DD MMMM YYYY')
              : '-',
          status() {
            return (
              <Badge
                title={
                  deliveredAt === null ? 'En proceso de envío' : 'Entregado'
                }
                color={deliveredAt === null ? 'orange' : 'green'}
              />
            );
          },
          action() {
            return (
              <Link href="/shipments/[id]" as={`/shipments/${id}`}>
                <a className="text-gray-900 p-1 float-right">
                  <PencilIcon className="w-5" />
                  <span className="sr-only">Editar</span>
                </a>
              </Link>
            );
          },
        };
      })
    );
  }, [shipments]);

  return (
    <Card>
      <Table
        headers={header}
        content={data}
        href="/shipments/create"
        as="/shipments/create"
        text="Cases"
        tableHeader={
          <>
            <div className="flex flex-row flex-wrap w-full p-6">
              <h2 className="text-lg leading-7 font-medium text-gray-900 my-auto flex-1">
                Todos los envíos
              </h2>

              <Link href="/shipments/create">
                <a
                  type="button"
                  className="bg-indigo-600 flex items-center px-4 py-2.5 rounded-lg text-white"
                >
                  <PlusIcon className="w-5 mr-1" />
                  <span>Nuevo envío</span>
                </a>
              </Link>
            </div>
          </>
        }
      />
    </Card>
  );
}
