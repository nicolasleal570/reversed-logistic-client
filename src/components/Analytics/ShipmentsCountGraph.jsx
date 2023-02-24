import dayjs from 'dayjs';
import Link from 'next/link';
import { Card } from '@components/Card/Card';
import Table from '@components/Table/Table';
import { Tooltip } from './Tooltip';

const header = [
  {
    Header: 'Número de tracking',
    accessor: 'trackNumber',
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: 'Fecha de envío',
    accessor: 'shipmentAt',
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: 'Fecha de entrega',
    accessor: 'deliveredAt',
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: '',
    accessor: 'actions',
    Cell: ({ row: { index }, data: _data }) => _data[index].actions(),
    disableFilters: true,
    disableSortBy: true,
  },
];

export function ShipmentsCountGraph({ shipmentsCount }) {
  const { shipments: data, graph } = shipmentsCount;

  return (
    <Card className="p-0">
      <h2 className="p-4 flex items-center w-full text-lg leading-7 font-semibold border-b border-gray-200">
        Envíos del mes
        <Tooltip
          title="Envíos del mes"
          description="Este KPI mide el número total de envíos realizados en el mes seleccionado."
        />
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-x">
        <div className="col-span-2">
          <Table
            headers={header}
            content={data.map((item) => ({
              ...item,
              trackNumber: item?.trackNumber?.toUpperCase(),
              shipmentAt: dayjs(item.shipmentAt).format(
                'hh:mm A - dddd DD MMMM YYYY'
              ),
              deliveredAt: dayjs(item.deliveredAt).format(
                'hh:mm A - dddd DD MMMM YYYY'
              ),
              actions() {
                return (
                  <Link href="/shipments/[id]" as={`/shipments/${item.id}`}>
                    <a className="text-blue-500 text-xs font-medium rounded hover:ring-2 px-1.5 py-1">
                      <span>Examinar</span>
                    </a>
                  </Link>
                );
              },
            }))}
            deactivateSearchBar
            deactivatePagination
          />
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="w-[150px] h-[150px] m-6 rounded-full flex items-center justify-center flex-col border-8 border-indigo-400">
            <p className="text-6xl font-medium text-gray-700">{graph.count}</p>
            <p className="text-xs font-medium text-center text-gray-600">
              Total de envíos <br /> este mes
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
