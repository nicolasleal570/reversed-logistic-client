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
} from '@api/analytics/methods';
import { BestCaseContentsGraph } from '@components/Analytics/BestCaseContents';
import { BestCasesGraph } from '@components/Analytics/BestCases';

function AnalyticsPage({
  customers,
  bestCustomers,
  bestCaseContents,
  bestCases,
}) {
  return (
    <Layout
      title="Analíticas y métricas"
      description="Aquí podrás examinar las métricas en tu línea de producción y así optimizar los puntos donde encuentres fallas."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
  if (data.token) {
    try {
      const { data: customersData } = await fetchCustomers(data.token);
      const { data: bestCustomersData } = await fetchBestCustomers(data.token);
      const { data: bestCaseContentsData } = await fetchBestCaseContents(
        data.token
      );
      const { data: bestCasesData } = await fetchBestCases(data.token);

      customers = customersData;
      bestCustomers = bestCustomersData;
      bestCaseContents = bestCaseContentsData;
      bestCases = bestCasesData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    customers: customers ?? [],
    bestCustomers: bestCustomers ?? [],
    bestCaseContents: bestCaseContents ?? [],
    bestCases: bestCases ?? [],
  };
};

export default withProtection(AnalyticsPage);
