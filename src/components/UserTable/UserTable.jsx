import React from 'react';
import Link from 'next/link';
import Table from '@components/Table/Table';
import { PlusIcon, PencilIcon } from '@heroicons/react/outline';
import { Card } from '@components/Card/Card';

function UserTable({ users }) {
  const [data, setData] = React.useState([]);
  const header = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Nombre',
      accessor: 'fullName',
    },
    {
      Header: 'Correo Electrónico',
      accessor: 'email',
    },
    {
      Header: 'Teléfono',
      accessor: 'phone',
    },
    {
      Header: 'Acciones',
      accessor: 'action',
      Cell: ({ row: { index }, data: _data }) => _data[index].action(),
      disableFilters: true,
      disableSortBy: true,
    },
  ];

  React.useEffect(() => {
    setData(
      users.map(({ id, ...user }) => ({
        ...user,
        id,
        action() {
          return (
            <Link href="/users/[id]" as={`/users/${id}`}>
              <a className="text-gray-900 p-1 float-right">
                <PencilIcon className="w-5" />
                <span className="sr-only">Editar</span>
              </a>
            </Link>
          );
        },
      }))
    );
  }, [users]);

  return (
    <Card>
      <Table
        headers={header}
        content={data}
        href="/users/create"
        as="/users/create"
        text="Usuarios"
        tableHeader={
          <>
            <div className="flex flex-row flex-wrap w-full p-6">
              <h2 className="text-lg leading-7 font-medium text-gray-900 my-auto flex-1">
                Todos los usuarios
              </h2>

              <Link href="/users/create">
                <a
                  type="button"
                  className="bg-indigo-600 flex items-center px-4 py-2.5 rounded-lg text-white"
                >
                  <PlusIcon className="w-5 mr-1" />
                  <span>Nuevo usuario</span>
                </a>
              </Link>
            </div>
          </>
        }
      />
    </Card>
  );
}

export default UserTable;
