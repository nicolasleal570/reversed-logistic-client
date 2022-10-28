import { withProtection } from '@components/withProtection';
import { Layout } from '@components/Layout/Layout';
import { OrdersByCustomerLocationsGraph } from '@components/Analytics/OrdersByCustomerLocations';
import { parseCookies } from '@utils/parseCookies';
import { fetchCustomers } from '@api/customers/methods';
import { BestCustomersGraph } from '@components/Analytics/BestCustomers';
import {
  fetchBestCaseContents,
  fetchBestCases,
  fetchBestCustomers,
  fetchLateDeliveries,
} from '@api/analytics/methods';
import { BestCaseContentsGraph } from '@components/Analytics/BestCaseContents';
import { BestCasesGraph } from '@components/Analytics/BestCases';
import { CountOrdersGraph } from '@components/Analytics/CountOrders';
import { LateDeliveriesGraph } from '@components/Analytics/LateDeliveries';

function AnalyticsPage({
  customers,
  bestCustomers,
  bestCaseContents,
  bestCases,
  lateDeliveries,
}) {
  return (
    <Layout
      title="Analíticas y métricas"
      description="Aquí podrás examinar las métricas en tu línea de producción y así optimizar los puntos donde encuentres fallas."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="col-span-2 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <CountOrdersGraph />
          <LateDeliveriesGraph count={lateDeliveries?.graph?.count} />
        </div>

        <div className="col-span-2">
          <BestCasesGraph cases={bestCases} />
        </div>

        <OrdersByCustomerLocationsGraph customers={customers} />
        <BestCustomersGraph customers={bestCustomers} />

        <div className="col-span-2">
          <BestCaseContentsGraph caseContents={bestCaseContents} />
        </div>
      </div>
    </Layout>
  );
}

AnalyticsPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let customers = [];
  let bestCustomers = [];
  let bestCaseContents = [];
  let bestCases = [];
  let lateDeliveries = [];
  if (data.token) {
    try {
      const { data: customersData } = await fetchCustomers(data.token);
      const { data: bestCustomersData } = await fetchBestCustomers(data.token);
      const { data: bestCaseContentsData } = await fetchBestCaseContents(
        data.token
      );
      const { data: bestCasesData } = await fetchBestCases(data.token);
      const { data: lateDeliveriesData } = await fetchLateDeliveries(
        data.token
      );

      customers = customersData;
      bestCustomers = bestCustomersData;
      bestCaseContents = bestCaseContentsData;
      bestCases = bestCasesData;
      lateDeliveries = lateDeliveriesData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    customers: customers ?? [],
    bestCustomers: bestCustomers ?? [],
    bestCaseContents: bestCaseContents ?? [],
    bestCases: bestCases ?? [],
    lateDeliveries: lateDeliveries ?? [],
  };
};

export default withProtection(AnalyticsPage);
