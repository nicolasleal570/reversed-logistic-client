import { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Card } from '@components/Card/Card';

export function BestCustomersGraph({ customers }) {
  const [data, setData] = useState([...customers]);

  return (
    <Card className="p-4">
      <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
        Clientes con más compras
      </h2>

      {data ? (
        <ResponsiveContainer width={'100%'} height={500}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis allowDecimals={false} dataKey="companyName" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Total"
              stroke="rgb(239 68 68)"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <h2 className="block w-full text-xl text-center my-12">No hay data</h2>
      )}
    </Card>
  );
}
