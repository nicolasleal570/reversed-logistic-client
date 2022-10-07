import React, { useEffect } from 'react';
import Link from 'next/link';
import Table from '@components/Table/Table';
import { PlusIcon, PencilIcon } from '@heroicons/react/outline';
import { Card } from '@components/Card/Card';
import { Badge } from '@components/Badge/Badge';

const header = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Modelo',
    accessor: 'model',
  },
  {
    Header: 'Marca',
    accessor: 'brand',
  },
  {
    Header: 'Tipo',
    accessor: 'type',
  },
  {
    Header: 'Placa',
    accessor: 'licensePlate',
  },
  {
    Header: 'Conductor',
    accessor: 'driver',
  },
  {
    Header: 'Acciones',
    accessor: 'action',
    Cell: ({ row: { index }, data: _data }) => _data[index].action(),
    disableFilters: true,
    disableSortBy: true,
  },
];

export function TruckTable({ trucks }) {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    setData(
      trucks.map(({ id, model, brand, type, licensePlate, driver }) => ({
        id,
        model,
        brand,
        type,
        licensePlate,
        driver: driver?.fullName ?? '-',
        action() {
          return (
            <Link href="/trucks/[id]" as={`/trucks/${id}`}>
              <a className="text-gray-900 p-1 float-right">
                <PencilIcon className="w-5" />
                <span className="sr-only">Editar</span>
              </a>
            </Link>
          );
        },
      }))
    );
  }, [trucks]);

  return (
    <Card>
      <Table
        headers={header}
        content={data}
        href="/trucks/create"
        as="/trucks/create"
        text="Camiones"
        tableHeader={
          <>
            <div className="flex flex-col lg:flex-row flex-wrap w-full p-6">
              <h2 className="text-lg leading-7 font-medium text-gray-900 my-auto flex-1 mb-4 g:mb-0">
                Todos los vehículos de transporte
              </h2>

              <Link href="/trucks/create">
                <a
                  type="button"
                  className="bg-indigo-600 flex items-center px-4 py-2.5 rounded-lg text-white"
                >
                  <PlusIcon className="w-5 mr-1" />
                  <span>Nuevo transporte</span>
                </a>
              </Link>
            </div>
          </>
        }
      />
    </Card>
  );
}
