import { useState } from 'react';
import { withProtection } from '@components/withProtection';
import { Layout } from '@components/Layout/Layout';
import { AnalyticsSubmenu } from '@components/AnalyticsSubmenu/AnalyticsSubmenu';
import {
  fetchBestCustomers,
  fetchBestCustomersLocation,
} from '@api/analytics/methods';
import { parseCookies } from '@utils/parseCookies';
import { BestCustomersGraph } from '@components/Analytics/BestCustomers';
import { BestCustomersLocationGraph } from '@components/Analytics/BestCustomersLocation';
import { AnalyticsDateSelectors } from '@components/Analytics/AnalyticsDateSelectors';
import { useNotify } from '@hooks/useNotify';

function CustomersAnalytics({
  bestCustomers: bestCustomersData,
  bestCustomersLocation: bestCustomersLocationData,
  token,
}) {
  const { asyncNotify } = useNotify();
  const [isLoading, setIsLoading] = useState(false);
  const [bestCustomers, setBestCustomers] = useState([...bestCustomersData]);
  const [bestCustomersLocation, setBestCustomersLocation] = useState([
    ...bestCustomersLocationData,
  ]);

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const [
        { data: bestCustomersResData },
        { data: bestCustomersLocationResData },
      ] = await asyncNotify(
        Promise.all([
          fetchBestCustomers(token, values),
          fetchBestCustomersLocation(token, values),
        ]),
        {
          pending: 'Filtrando la data correspondiente...',
          success: 'La data se filtró correctamente.',
          error: 'Tuvimos problemas al filtrar los datos. Intenta de nuevo.',
        }
      );

      setBestCustomers(bestCustomersResData);
      setBestCustomersLocation(bestCustomersLocationResData);
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Layout
      title="Analíticas y métricas sobre clientes"
      description="Aquí podrás examinar todas las métricas correspondientes al módulo de clientes y sucursales."
    >
      <div className="flex items-center justify-between">
        <div className="mr-auto">
          <AnalyticsDateSelectors onSubmit={onSubmit} />
        </div>

        <AnalyticsSubmenu />
      </div>
      {isLoading ? (
        <h1 className="text-4xl py-10 text-center font-bold text-gray-700">
          CARGANDO...
        </h1>
      ) : (
        <div className="grid grid-cols-1 gap-8 mt-8 w-full">
          <BestCustomersGraph customers={bestCustomers} />
          <BestCustomersLocationGraph locations={bestCustomersLocation} />
        </div>
      )}
    </Layout>
  );
}

CustomersAnalytics.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let bestCustomers = [];
  let bestCustomersLocation = [];

  if (data.token) {
    try {
      const { data: bestCustomersData } = await fetchBestCustomers(data.token);
      const { data: bestCustomersLocationData } =
        await fetchBestCustomersLocation(data.token);

      bestCustomers = bestCustomersData;
      bestCustomersLocation = bestCustomersLocationData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    bestCustomers: bestCustomers ?? [],
    bestCustomersLocation: bestCustomersLocation ?? [],
    token: data.token || '',
  };
};

export default withProtection(CustomersAnalytics);
