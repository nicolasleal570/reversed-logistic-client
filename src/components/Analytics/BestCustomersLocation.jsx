import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Link from 'next/link';
import { Card } from '@components/Card/Card';
import Table from '@components/Table/Table';

const header = [
  {
    Header: 'ID',
    accessor: 'id',
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: 'Sucursal',
    accessor: 'name',
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: 'Cliente',
    accessor: 'customerName',
    Cell: ({ row: { index }, data: _data }) => _data[index].customerName(),
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: 'Compras',
    accessor: 'totalOrders',
    disableFilters: true,
    disableSortBy: true,
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff42fa'];

export function BestCustomersLocationGraph({ locations: data }) {
  return (
    <Card className="p-0">
      <h2 className="p-4 block w-full text-lg leading-7 font-semibold border-b border-gray-200">
        Top sucursales con más compras
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-x">
        <div className="col-span-2">
          <Table
            headers={header}
            content={data.map((item) => ({
              ...item,
              customerName() {
                return (
                  <Link
                    href="/customers/[id]"
                    as={`/customers/${item.customer.id}`}
                  >
                    <a className="text-blue-500 hover:underline">
                      <span>{item.customer.companyName}</span>
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

        {data && data?.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={500} height={500}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data.map((item) => ({
                  name: item.name,
                  value: item.totalOrders,
                }))}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#6466f1"
                label
              >
                {data.map((item, idx) => (
                  <Cell key={JSON.stringify(item)} fill={COLORS[idx]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <h2 className="block w-full text-xl text-center my-12">
            No hay data
          </h2>
        )}
      </div>
    </Card>
  );
}
