import React, { useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PlusIcon, PencilIcon } from '@heroicons/react/outline';
import { Card } from '@components/Card/Card';
import { Badge } from '@components/Badge/Badge';
import { availableCasesState } from '@constants/availableCasesState';
import { useCases } from '@hooks/useCases';
import Table from '@components/Table/Table';

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
    accessor: 'state',
    Cell: ({ row: { index }, data: _data }) => _data[index].state(),
  },
  {
    Header: 'Acciones',
    accessor: 'action',
    Cell: ({ row: { index }, data: _data }) => _data[index].action(),
    disableFilters: true,
    disableSortBy: true,
  },
];

const handleMap =
  () =>
  ({ id, name, volume, weight }) => ({
    id,
    name,
    volume() {
      return <>{volume ?? '-'}</>;
    },
    weight() {
      return <>{weight ?? '-'}</>;
    },
    state() {
      return <Badge title="Inhabilitado" color="red" />;
    },
    action() {
      return (
        <div className="flex items-center justify-end">
          <Link href="/cases/[id]" as={`/cases/${id}`}>
            <a className="text-gray-900 p-1 float-right">
              <PencilIcon className="w-5" />
              <span className="sr-only">Editar</span>
            </a>
          </Link>
        </div>
      );
    },
  });

export function DisabledCasesTable() {
  const router = useRouter();
  const { updateCase, fetchCases } = useCases();
  const isMounted = React.useRef();
  const [data, setData] = React.useState([]);
  const [allCases, setAllCases] = React.useState([]);

  const handleFetchCases = useCallback(async () => {
    const res = await fetchCases({ state: 'DELETED' });
    setAllCases(res.data);
  }, [fetchCases]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      handleFetchCases();
    }
  }, [handleFetchCases]);

  useEffect(() => {
    setData(allCases.map(handleMap()));
  }, [allCases, router, updateCase]);

  return (
    <>
      <Card>
        <Table
          headers={header}
          content={data}
          href="/cases/create"
          as="/cases/create"
          text="Cases"
          tableHeader={
            <>
              <div className="flex flex-col lg:flex-row flex-wrap w-full p-6">
                <h2 className="text-lg leading-7 font-medium text-gray-900 my-auto flex-1 mb-4 g:mb-0">
                  Cases inhabilitados
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
    </>
  );
}
