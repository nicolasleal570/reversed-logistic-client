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
    Header: 'Nombre',
    accessor: 'name',
  },
  {
    Header: 'Descripción',
    accessor: 'description',
  },
  {
    Header: 'Permisos',
    accessor: 'permissions',
  },
  {
    Header: 'Acciones',
    accessor: 'action',
    Cell: ({ row: { index }, data: _data }) => _data[index].action(),
    disableFilters: true,
    disableSortBy: true,
  },
];

export function RolesTable({ roles }) {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    setData(
      roles.map(({ id, name, description, value, permissions }) => ({
        id,
        name,
        description: description || '-',
        permissions: value !== 'SUDO' ? permissions.length : 'N/A',
        action() {
          return (
            <Link href="/roles/[id]" as={`/roles/${id}`}>
              <a className="text-gray-900 p-1 float-right">
                <PencilIcon className="w-5" />
                <span className="sr-only">Editar</span>
              </a>
            </Link>
          );
        },
      }))
    );
  }, [roles]);

  return (
    <Card>
      <Table
        headers={header}
        content={data}
        href="/roles/create"
        as="/roles/create"
        text="Roles"
        tableHeader={
          <>
            <div className="flex flex-col lg:flex-row flex-wrap w-full p-6">
              <h2 className="text-lg leading-7 font-medium text-gray-900 my-auto flex-1 mb-4 g:mb-0">
                Todos los roles
              </h2>

              <Link href="/roles/create">
                <a
                  type="button"
                  className="bg-indigo-600 flex items-center px-4 py-2.5 rounded-lg text-white"
                >
                  <PlusIcon className="w-5 mr-1" />
                  <span>Nuevo rol</span>
                </a>
              </Link>
            </div>
          </>
        }
      />
    </Card>
  );
}
