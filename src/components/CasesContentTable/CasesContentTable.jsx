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
    Header: 'Precio x Litro',
    accessor: 'price',
    Cell: ({ row: { index }, data: _data }) => _data[index].price(),
  },
  {
    Header: 'Acciones',
    accessor: 'action',
    Cell: ({ row: { index }, data: _data }) => _data[index].action(),
    disableFilters: true,
    disableSortBy: true,
  },
];

export function CasesContentTable({ casesContent }) {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    setData(
      casesContent.map(({ id, name, description, price }) => ({
        id,
        name,
        price() {
          return <>Bs. {price}</>;
        },
        description() {
          return <>{description ?? '-'}</>;
        },
        action() {
          return (
            <Link href="/flavors/[id]" as={`/flavors/${id}`}>
              <a className="text-gray-900 p-1 float-right">
                <PencilIcon className="w-5" />
                <span className="sr-only">Editar</span>
              </a>
            </Link>
          );
        },
      }))
    );
  }, [casesContent]);

  return (
    <Card>
      <Table
        headers={header}
        content={data}
        href="/flavors/create"
        as="/flavors/create"
        text="Sabores de cerveza"
        tableHeader={
          <>
            <div className="flex flex-row flex-wrap w-full p-6">
              <h2 className="text-lg leading-7 font-medium text-gray-900 my-auto flex-1">
                Todos los sabores
              </h2>

              <Link href="/flavors/create">
                <a
                  type="button"
                  className="bg-indigo-600 flex items-center px-4 py-2.5 rounded-lg text-white"
                >
                  <PlusIcon className="w-5 mr-1" />
                  <span>Nuevo sabor</span>
                </a>
              </Link>
            </div>
          </>
        }
      />
    </Card>
  );
}
