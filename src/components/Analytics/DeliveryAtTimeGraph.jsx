import Link from 'next/link';
import dayjs from 'dayjs';
import { Card } from '@components/Card/Card';
import Table from '@components/Table/Table';
import { Tooltip } from './Tooltip';

const header = [
  {
    Header: 'Orden',
    accessor: 'orderName',
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: 'Fecha de entrega estimada',
    accessor: 'expectedDeliveryDate',
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
    Header: 'Responsable',
    accessor: 'assignedTo',
    Cell: ({ row: { index }, data: _data }) => _data[index].assignedTo(),
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: 'Duración de la entrega',
    accessor: 'deliveryAtTime',
    Cell: ({ row: { index }, data: _data }) => _data[index].deliveryAtTime(),
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: '',
    accessor: 'actions',
    Cell: ({ row: { index }, data: _data }) => _data[index].action(),
    disableFilters: true,
    disableSortBy: true,
  },
];

export function DeliveryAtTimeGraph({ deliveryAtTime: data }) {
  return (
    <Card className="p-0">
      <h2 className="p-4 flex items-center w-full text-lg leading-7 font-semibold border-b border-gray-200">
        Entregas final a tiempo
        <Tooltip
          title="Entregas final a tiempo"
          description="Este KPI mide que tanto tarda un pedido en llegar al cliente final en el mes seleccionado."
        />
      </h2>

      <div className="grid grid-cols-1">
        <Table
          headers={header}
          content={data
            .sort(
              (a, b) =>
                Number.parseFloat(a.deliveryAtTime.split(' ')[0]) -
                Number.parseFloat(b.deliveryAtTime.split(' ')[0])
            )
            .map((item) => ({
              ...item,
              orderName: `#OR${item.id}`,
              expectedDeliveryDate: dayjs(item.expectedDeliveryDate).format(
                'hh:mm A - dddd DD MMMM YYYY'
              ),
              deliveredAt: dayjs(item.deliveredAt).format(
                'hh:mm A - dddd DD MMMM YYYY'
              ),
              deliveryAtTime() {
                return (
                  <span
                    className={
                      Number.parseFloat(item.deliveryAtTime.split(' ')[0]) < 0
                        ? 'text-red-500'
                        : 'text-green-500'
                    }
                  >
                    {item.deliveryAtTime}
                  </span>
                );
              },
              assignedTo() {
                return (
                  <Link href="/users/[id]" as={`/users/${item.assignedTo.id}`}>
                    <a className="text-blue-500 text-xs font-medium rounded hover:ring-2 px-1.5 py-1">
                      <span>{item.assignedTo.fullName}</span>
                    </a>
                  </Link>
                );
              },
              action() {
                return (
                  <Link href="/orders/[id]" as={`/orders/${item.id}`}>
                    <a className="text-blue-500 text-xs font-medium rounded hover:ring-2 px-1.5 py-1">
                      <span>Examinar</span>
                    </a>
                  </Link>
                );
              },
            }))}
          href="/cases/create"
          as="/cases/create"
          text="Cases"
          deactivateSearchBar
          deactivatePagination
        />
      </div>
    </Card>
  );
}
