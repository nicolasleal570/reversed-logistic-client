import React, { useEffect } from 'react';
import Link from 'next/link';
import Table from '@components/Table/Table';
import { PlusIcon, PencilIcon } from '@heroicons/react/outline';
import { Card } from '@components/Card/Card';
import { formatCustomerLocationName } from '@components/OrderForm/OrderForm';

const header = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Case',
    accessor: 'caseName',
  },
  {
    Header: 'Contenido del case',
    accessor: 'caseContentName',
  },
  {
    Header: 'Cliente',
    accessor: 'customer',
  },
  {
    Header: 'Sucursal del cliente',
    accessor: 'customerLocation',
  },
  {
    Header: 'Acciones',
    accessor: 'action',
    Cell: ({ row: { index }, data: _data }) => _data[index].action(),
    disableFilters: true,
    disableSortBy: true,
  },
];

export function CteanProcessTable({ cleanProcessOrders }) {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    setData(
      cleanProcessOrders.map(
        ({ id, case: caseInfo, caseContent, customerLocation }) => {
          const { name: caseName } = caseInfo;
          const { name: caseContentName } = caseContent;
          const {} = customerLocation;

          return {
            id,
            caseName,
            caseContentName,
            customer: customerLocation.customer.companyName,
            customerLocation: formatCustomerLocationName(
              customerLocation.customer,
              customerLocation
            ),
            action() {
              return (
                <Link href="/clean-process/[id]" as={`/clean-process/${id}`}>
                  <a className="text-gray-900 p-1 float-right">
                    <PencilIcon className="w-5" />
                    <span className="sr-only">Editar</span>
                  </a>
                </Link>
              );
            },
          };
        }
      )
    );
  }, [cleanProcessOrders]);

  return (
    <Card>
      <Table
        headers={header}
        content={data}
        href="/clean-process/create"
        as="/clean-process/create"
        text="Proceso de limpieza"
        tableHeader={
          <>
            <div className="flex flex-row flex-wrap w-full p-6">
              <h2 className="text-lg leading-7 font-medium text-gray-900 my-auto flex-1">
                Todos los procesos de limpieza
              </h2>

              <Link href="/clean-process/create">
                <a
                  type="button"
                  className="bg-indigo-600 flex items-center px-4 py-2.5 rounded-lg text-white"
                >
                  <PlusIcon className="w-5 mr-1" />
                  <span>Nueva limpieza</span>
                </a>
              </Link>
            </div>
          </>
        }
      />
    </Card>
  );
}
