import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import Link from 'next/link';
import Table from '@components/Table/Table';
import { PlusIcon, PencilIcon } from '@heroicons/react/outline';
import { Card } from '@components/Card/Card';
import { Badge } from '@components/Badge/Badge';
import { useShipments } from '@hooks/useShipments';
import { FilterPillTable } from '@components/FilterPillTable/FilterPillTable';
// import { availableCasesState } from '@constants/availableCasesState';

const header = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Fecha de envío',
    accessor: 'shipmentAt',
  },
  {
    Header: 'Fecha de entrega',
    accessor: 'deliveredAt',
  },
  {
    Header: 'Órdenes asignadas',
    accessor: 'numOrders',
  },
  {
    Header: 'Creado por',
    accessor: 'createdByName',
  },
  {
    Header: 'Estado',
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

export const shipentStatusColor = {
  WAITING_SHIPMENT: 'yellow',
  IN_SHIPMENT: 'cyan',
  SHIPMENT_DONE: 'green',
};

export function ShipmentsTable({
  shipments: rawShipments,
  onlyTable,
  filterTabs = [],
}) {
  const router = useRouter();
  const { startShipment, updateShipment } = useShipments();
  const [data, setData] = React.useState([]);
  const [shipments, setShipments] = useState([]);
  const [currentTab, setCurrentTab] = useState('ALL');

  const renderRow = ({
    id,
    shipmentAt,
    deliveredAt,
    status: shipmentStatus,
    createdBy,
    orders,
  }) => {
    return {
      id,
      numOrders: orders?.length ?? '-',
      createdByName: createdBy?.fullName ?? '-',
      shipmentAt:
        shipmentAt !== null
          ? dayjs(shipmentAt).format('hh:mm A - dddd DD MMMM YYYY')
          : '-',
      deliveredAt:
        deliveredAt !== null
          ? dayjs(deliveredAt).format('hh:mm A - dddd DD MMMM YYYY')
          : '-',
      status() {
        const { name, value } = shipmentStatus ?? {};
        return (
          <Badge
            title={name ?? '-'}
            color={shipentStatusColor[value]}
            size="small"
          />
        );
      },
      action() {
        return (
          <div className="flex items-center justify-end">
            {shipmentStatus?.value === 'WAITING_SHIPMENT' && orders.length > 0 && (
              <>
                <button
                  type="button"
                  className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
                  onClick={async () => {
                    await startShipment({ id });
                    router.push(`/shipments/${id}`);
                  }}
                >
                  <span>Enviar</span>
                </button>
              </>
            )}

            {orders.filter((order) => order.deliveredAt === null).length ===
              0 &&
              shipmentStatus?.value === 'IN_SHIPMENT' &&
              shipmentAt && (
                <>
                  <button
                    type="button"
                    className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
                    onClick={async () => {
                      await updateShipment(id, { deliveredAt: new Date() });
                      router.push(`/shipments/${id}`);
                    }}
                  >
                    <span>Entregar</span>
                  </button>
                </>
              )}

            <Link href="/shipments/[id]" as={`/shipments/${id}`}>
              <a className="text-gray-900 p-1">
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
    setData(shipments.map(renderRow));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipments]);

  useEffect(() => {
    if (currentTab !== 'ALL') {
      setShipments(
        rawShipments.filter((item) => item.status.value === currentTab)
      );
    } else {
      setShipments([...rawShipments]);
    }
  }, [rawShipments, currentTab]);

  return (
    <>
      {filterTabs.length > 0 && (
        <FilterPillTable
          tabs={filterTabs}
          currentTab={currentTab}
          onClick={(value) =>
            value ? setCurrentTab(value) : setCurrentTab('ALL')
          }
        />
      )}

      <Card>
        <Table
          headers={header}
          content={data}
          href="/shipments/create"
          as="/shipments/create"
          text="Cases"
          deactivateSearchBar
          tableHeader={
            <>
              {!onlyTable && (
                <div className="flex flex-col lg:flex-row flex-wrap w-full p-6">
                  <h2 className="text-lg leading-7 font-medium text-gray-900 my-auto flex-1 mb-4 g:mb-0">
                    Todos los envíos
                  </h2>

                  <Link href="/shipments/create">
                    <a
                      type="button"
                      className="bg-indigo-600 flex items-center px-4 py-2.5 rounded-lg text-white"
                    >
                      <PlusIcon className="w-5 mr-1" />
                      <span>Nuevo envío</span>
                    </a>
                  </Link>
                </div>
              )}
            </>
          }
        />
      </Card>
    </>
  );
}
