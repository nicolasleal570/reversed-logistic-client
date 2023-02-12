import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
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
    Header: 'Name',
    accessor: 'Nombre',
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: 'Usos',
    accessor: 'usesCount',
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff42fa'];

export function BestCasesGraph({ cases }) {
  return (
    <Card className="p-0">
      <h2 className="p-4 block w-full text-lg leading-7 font-semibold border-b border-gray-200">
        Top cases con más usos
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-x">
        <Table
          headers={header}
          content={cases.map((item) => ({
            ...item,
            action() {
              return (
                <Link href="/cases/[id]" as={`/cases/${item.id}`}>
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

        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={500} height={500}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={cases.map((item) => ({
                name: item.name,
                value: item.usesCount,
              }))}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#6466f1"
              label
            >
              {cases.map((item, idx) => (
                <Cell key={JSON.stringify(item)} fill={COLORS[idx]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/*data && data?.length > 0 ? (
        <ResponsiveContainer width={'100%'} height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis allowDecimals={false} dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Ventas"
              stroke="rgb(239 68 68)"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <h2 className="block w-full text-xl text-center my-12">No hay data</h2>
      )*/}
    </Card>
  );
}
