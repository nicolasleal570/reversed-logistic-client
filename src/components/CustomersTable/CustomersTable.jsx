import React, { useEffect } from 'react';
import Link from 'next/link';
import Table from '@components/Table/Table';
import { PlusIcon, PencilIcon } from '@heroicons/react/outline';
import { Card } from '@components/Card/Card';

const header = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Name',
    accessor: 'companyName',
  },
  {
    Header: 'Descripción',
    accessor: 'description',
    Cell: ({ row: { index }, data: _data }) => _data[index].description(),
  },
  {
    Header: 'Rif',
    accessor: 'rif',
  },
  {
    Header: 'Página web',
    accessor: 'website',
    Cell: ({ row: { index }, data: _data }) => _data[index].website(),
  },
  {
    Header: 'Acciones',
    accessor: 'action',
    Cell: ({ row: { index }, data: _data }) => _data[index].action(),
    disableFilters: true,
    disableSortBy: true,
  },
];

export function CustomersTable({ customers }) {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    setData(
      customers.map(({ id, companyName, description, rif, website }) => ({
        id,
        companyName,
        rif,
        description() {
          return <>{description || '-'}</>;
        },
        website() {
          return (
            <>
              {website ? (
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  {website}
                </a>
              ) : (
                '-'
              )}
            </>
          );
        },
        action() {
          return (
            <Link href="/customers/[id]" as={`/customers/${id}`}>
              <a className="text-gray-900 p-1 float-right">
                <PencilIcon className="w-5" />
                <span className="sr-only">Editar</span>
              </a>
            </Link>
          );
        },
      }))
    );
  }, [customers]);

  return (
    <Card>
      <Table
        headers={header}
        content={data}
        href="/customers/create"
        as="/customers/create"
        text="Clientes"
        tableHeader={
          <>
            <div className="flex flex-row flex-wrap w-full p-6">
              <h2 className="text-lg leading-7 font-medium text-gray-900 my-auto flex-1">
                Todos los clientes
              </h2>

              <Link href="/customers/create">
                <a
                  type="button"
                  className="bg-indigo-600 flex items-center px-4 py-2.5 rounded-lg text-white"
                >
                  <PlusIcon className="w-5 mr-1" />
                  <span>Nuevo cliente</span>
                </a>
              </Link>
            </div>
          </>
        }
      />
    </Card>
  );
}
