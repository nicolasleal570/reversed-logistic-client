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

function CustomersAnalytics({ bestCustomers, bestCustomersLocation }) {
  const onSubmit = () => {};

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
      <div className="grid grid-cols-1 gap-8 mt-8 w-full">
        <BestCustomersGraph customers={bestCustomers} />
        <BestCustomersLocationGraph locations={bestCustomersLocation} />
      </div>
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
  };
};

export default withProtection(CustomersAnalytics);
