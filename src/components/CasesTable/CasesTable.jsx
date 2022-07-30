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
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Descripción',
    accessor: 'description',
    Cell: ({ row: { index }, data: _data }) => _data[index].description(),
  },
  {
    Header: 'Volumen',
    accessor: 'volume',
    Cell: ({ row: { index }, data: _data }) => _data[index].volume(),
  },
  {
    Header: 'Peso',
    accessor: 'weight',
    Cell: ({ row: { index }, data: _data }) => _data[index].weight(),
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

export function CasesTable({ cases }) {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    setData(
      cases.map(({ id, name, description, volume, weight }) => ({
        id,
        name,
        description() {
          return <>{description ?? '-'}</>;
        },
        volume() {
          return <>{volume ?? '-'}</>;
        },
        weight() {
          return <>{weight ?? '-'}</>;
        },
        status() {
          return <Badge title="Epale" color="blue" />;
        },
        action() {
          return (
            <Link href="/cases/[id]" as={`/cases/${id}`}>
              <a className="text-gray-900 p-1 float-right">
                <PencilIcon className="w-5" />
                <span className="sr-only">Editar</span>
              </a>
            </Link>
          );
        },
      }))
    );
  }, [cases]);

  return (
    <Card>
      <Table
        headers={header}
        content={data}
        href="/cases/create"
        as="/cases/create"
        text="Cases"
        tableHeader={
          <>
            <div className="flex flex-row flex-wrap w-full p-6">
              <h2 className="text-lg leading-7 font-medium text-gray-900 my-auto flex-1">
                Todos los cases
              </h2>

              <Link href="/cases/create">
                <a
                  type="button"
                  className="bg-indigo-600 flex items-center px-4 py-2.5 rounded-lg text-white"
                >
                  <PlusIcon className="w-5 mr-1" />
                  <span>Nuevo case</span>
                </a>
              </Link>
            </div>
          </>
        }
      />
    </Card>
  );
}
