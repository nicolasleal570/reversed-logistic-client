import React, { useEffect } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import Table from '@components/Table/Table';
import { PlusIcon, PencilIcon } from '@heroicons/react/outline';
import { Card } from '@components/Card/Card';
import { Badge } from '@components/Badge/Badge';
import { useCleanProcess } from '@hooks/useCleanProcess';
import { useRouter } from 'next/router';
import { FilterPillTable } from '@components/FilterPillTable/FilterPillTable';

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
    Header: 'Fecha de cominzo',
    accessor: 'startedAtDate',
  },
  {
    Header: 'Fecha de finalización',
    accessor: 'finishedAtDate',
  },
  {
    Header: 'Total de pasos',
    accessor: 'stepsLength',
  },
  {
    Header: 'Progreso',
    accessor: 'progress',
  },
  {
    Header: 'Estado',
    accessor: 'statusBadge',
    Cell: ({ row: { index }, data: _data }) => _data[index].statusBadge(),
  },
  {
    Header: 'Acciones',
    accessor: 'action',
    Cell: ({ row: { index }, data: _data }) => _data[index].action(),
    disableFilters: true,
    disableSortBy: true,
  },
];

export const cleanProcessOrderStatusColor = {
  CLEAN_PROCESS_QUEUED: 'blue',
  IN_CLEAN_PROCESS: 'orange',
  CLEAN_PROCESS_DONE: 'green',
};

export function CleanProcessTable({ cleanProcessOrders: rawData, filterTabs }) {
  const router = useRouter();
  const { startCleanProcess, doneCleanProcess } = useCleanProcess();
  const [data, setData] = React.useState([]);
  const [cleanProcessOrders, setCleanProcessOrders] = React.useState([]);
  const [currentTab, setCurrentTab] = React.useState('ALL');

  const renderRow = ({
    id,
    case: caseInfo,
    startedAt,
    finishedAt,
    status,
    steps,
  }) => {
    const { name: caseName } = caseInfo;

    const allStepsDone =
      steps?.filter((elem) => elem.isDone).length === steps?.length;

    return {
      id,
      caseName,
      stepsLength: steps.length,
      progress: `${Math.floor(
        (steps.filter((elem) => elem.isDone).length / steps.length) * 100
      )}%`,
      startedAtDate:
        startedAt !== null
          ? dayjs(startedAt).format('hh:mm A - dddd DD MMMM YYYY')
          : '-',
      finishedAtDate:
        finishedAt !== null
          ? dayjs(finishedAt).format('hh:mm A - dddd DD MMMM YYYY')
          : '-',
      statusBadge() {
        const { name, value } = status ?? {};
        return (
          <Badge
            title={name ?? '-'}
            color={cleanProcessOrderStatusColor[value]}
          />
        );
      },
      action() {
        return (
          <div className="flex items-center justify-end">
            {status.value === 'CLEAN_PROCESS_QUEUED' && (
              <>
                <button
                  type="button"
                  className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
                  onClick={async () => {
                    await startCleanProcess(id);
                    router.push(`/clean-process/${id}`);
                  }}
                >
                  <span>Comenzar limpieza</span>
                </button>
              </>
            )}
            {status.value === 'IN_CLEAN_PROCESS' && allStepsDone && (
              <>
                <button
                  type="button"
                  className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
                  onClick={async () => {
                    await doneCleanProcess(id);
                    router.push('/clean-process');
                  }}
                >
                  <span>Finalizar</span>
                </button>
              </>
            )}

            <Link href="/clean-process/[id]" as={`/clean-process/${id}`}>
              <a className="text-gray-900 p-1 float-right">
                <PencilIcon className="w-5" />
                <span className="sr-only">Editar</span>
              </a>
            </Link>
          </div>
        );
      },
    };
  };

  useEffect(() => {
    setData(cleanProcessOrders.map(renderRow));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanProcessOrders]);

  useEffect(() => {
    if (currentTab !== 'ALL') {
      setCleanProcessOrders(
        rawData.filter((item) => item.status.value === currentTab)
      );
    } else {
      setCleanProcessOrders([...rawData]);
    }
  }, [rawData, currentTab]);

  return (
    <>
      <FilterPillTable
        tabs={filterTabs}
        currentTab={currentTab}
        onClick={(value) =>
          value ? setCurrentTab(value) : setCurrentTab('ALL')
        }
      />

      <Card>
        <Table
          headers={header}
          content={data}
          href="/clean-process/create"
          as="/clean-process/create"
          text="Proceso de limpieza"
          tableHeader={
            <>
              <div className="flex flex-col lg:flex-row flex-wrap w-full p-6">
                <h2 className="text-lg leading-7 font-medium text-gray-900 my-auto flex-1 mb-4 g:mb-0">
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
    </>
  );
}
