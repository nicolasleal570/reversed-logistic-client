import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Table from '@components/Table/Table';
import { PlusIcon, PencilIcon } from '@heroicons/react/outline';
import { Card } from '@components/Card/Card';
import { Badge } from '@components/Badge/Badge';
import { availableCasesState } from '@constants/availableCasesState';
import { useCases } from '@hooks/useCases';
import classNames from 'classnames';

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
  ({ router, updateCase }) =>
  ({ id, name, volume, weight, state: stateId, currentOutOfStockOrderId }) => ({
    id,
    name,
    volume() {
      return <>{volume ?? '-'}</>;
    },
    weight() {
      return <>{weight ?? '-'}</>;
    },
    state() {
      const item = availableCasesState[stateId];
      return <Badge title={item?.title || ''} color={item?.color || ''} />;
    },
    action() {
      return (
        <div className="flex items-center justify-end">
          {stateId === 'OUT_OF_STOCK' && currentOutOfStockOrderId >= 0 && (
            <Link
              href={{
                pathname: `/out-of-stock-orders/${currentOutOfStockOrderId}`,
              }}
            >
              <a className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2">
                Revisar orden
              </a>
            </Link>
          )}

          {stateId === 'PICKUP_DONE' && (
            <Link
              href={{
                pathname: `/cases/${id}`,
                query: { checkHealth: true },
              }}
            >
              <a className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2">
                Examinar
              </a>
            </Link>
          )}

          {stateId === 'CLEAN_PROCESS_DONE' && (
            <button
              type="button"
              className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
              onClick={async () => {
                await updateCase(id, {
                  state: 'AVAILABLE',
                });
                router.push(`/cases/${id}`);
              }}
            >
              Habilitar
            </button>
          )}

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

export function CasesTable({ cases: allCases }) {
  const router = useRouter();
  const { updateCase } = useCases();
  const [data, setData] = React.useState([]);
  const [cases, setCases] = React.useState([]);
  const [currentTab, setCurrentTab] = React.useState('ALL');

  const tabs = useMemo(
    () =>
      Object.keys(availableCasesState).map((key) => ({
        title: availableCasesState[key].title,
        value: key,
      })),
    []
  );

  useEffect(() => {
    if (currentTab !== 'ALL') {
      setCases(allCases.filter((item) => item.state === currentTab));
    } else {
      setCases([...allCases]);
    }
  }, [allCases, currentTab]);

  useEffect(() => {
    setData(cases.map(handleMap({ router, updateCase })));
  }, [cases, router, updateCase]);

  return (
    <Card>
      <Table
        headers={header}
        content={data}
        href="/cases/create"
        as="/cases/create"
        text="Cases"
        filterTabs={
          <div className="flex flex-row flex-wrap items-center space-x-2">
            <button
              type="button"
              onClick={() => setCurrentTab('ALL')}
              className={classNames(
                'mb-3 py-1 px-3 rounded-full border text-sm',
                {
                  'bg-white border-gray-300': 'ALL' !== currentTab,
                  'bg-indigo-500 text-white border-indigo-500':
                    'ALL' === currentTab,
                }
              )}
            >
              Todos
            </button>
            {tabs.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setCurrentTab(item.value)}
                className={classNames(
                  'mb-3 py-1 px-3 rounded-full border text-sm',
                  {
                    'bg-white border-gray-300': item.value !== currentTab,
                    'bg-indigo-500 text-white border-indigo-500':
                      item.value === currentTab,
                  }
                )}
              >
                {item.title}
              </button>
            ))}
          </div>
        }
        tableHeader={
          <>
            <div className="flex flex-col lg:flex-row flex-wrap w-full p-6">
              <h2 className="text-lg leading-7 font-medium text-gray-900 my-auto flex-1 mb-4 g:mb-0">
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
