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

export function ProcessStepsTable({ processSteps }) {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    setData(
      processSteps.map(({ id, name, description, createdBy }) => {
        return {
          id,
          name,
          description,
          createdByName: createdBy.fullName,
          action() {
            return (
              <Link
                href="/clean-process/steps/[id]"
                as={`/clean-process/steps/${id}`}
              >
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
  }, [processSteps]);

  return (
    <Card>
      <Table
        headers={header}
        content={data}
        href="/clean-process/steps/create"
        as="/clean-process/steps/create"
        text="Pasos para el proceso de limpieza"
        tableHeader={
          <>
            <div className="flex flex-row flex-wrap w-full p-6">
              <h2 className="text-lg leading-7 font-medium text-gray-900 my-auto flex-1">
                Todos los pasos de limpieza
              </h2>

              <Link href="/clean-process/steps/create">
                <a
                  type="button"
                  className="bg-indigo-600 flex items-center px-4 py-2.5 rounded-lg text-white"
                >
                  <PlusIcon className="w-5 mr-1" />
                  <span>Nuevo paso de limpieza</span>
                </a>
              </Link>
            </div>
          </>
        }
      />
    </Card>
  );
}
