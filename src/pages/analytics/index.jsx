import dayjs from 'dayjs';
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
  fetchInventoryTurnover,
  fetchLateDeliveries,
  fetchShipmentsCount,
  fetchStockRotation,
} from '@api/analytics/methods';
import { BestCaseContentsGraph } from '@components/Analytics/BestCaseContents';
import { BestCasesGraph } from '@components/Analytics/BestCases';
import { CountOrdersGraph } from '@components/Analytics/CountOrders';
import { LateDeliveriesGraph } from '@components/Analytics/LateDeliveries';
import { InventoryTurnoverGraph } from '@components/Analytics/InventoryTurnover';
import { StockRotationGraph } from '@components/Analytics/StockRotation';

function AnalyticsPage({
  customers,
  bestCustomers,
  bestCaseContents,
  bestCases,
  lateDeliveries,
  inventoryTurnover,
  stockRotation,
  shipmentsCount,
}) {
  return (
    <Layout
      title="Analíticas y métricas"
      description="Aquí podrás examinar las métricas en tu línea de producción y así optimizar los puntos donde encuentres fallas."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2 grid gap-4 grid-cols-1 md:grid-cols-2">
          <CountOrdersGraph graph={shipmentsCount?.graph} />
          <LateDeliveriesGraph count={lateDeliveries?.graph?.count} />
          <InventoryTurnoverGraph count={inventoryTurnover?.graph?.count} />
          <StockRotationGraph count={stockRotation?.graph?.count} />
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
  let inventoryTurnover = {};
  let stockRotation = {};
  let shipmentsCount = {};
  if (data.token) {
    try {
      const { data: customersData } = await fetchCustomers(data.token);
      const { data: bestCustomersData } = await fetchBestCustomers(data.token);
      const { data: bestCaseContentsData } = await fetchBestCaseContents(
        data.token
      );
      const { data: bestCasesData } = await fetchBestCases(data.token);
      const { data: shipmentsCountData } = await fetchShipmentsCount(
        dayjs().month(),
        data.token
      );
      const { data: lateDeliveriesData } = await fetchLateDeliveries(
        data.token
      );
      const { data: inventoryTurnoverData } = await fetchInventoryTurnover(
        data.token
      );
      const { data: stockRotationData } = await fetchStockRotation(data.token);

      customers = customersData;
      bestCustomers = bestCustomersData;
      bestCaseContents = bestCaseContentsData;
      bestCases = bestCasesData;
      lateDeliveries = lateDeliveriesData;
      inventoryTurnover = inventoryTurnoverData;
      stockRotation = stockRotationData;
      shipmentsCount = shipmentsCountData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    customers: customers ?? [],
    bestCustomers: bestCustomers ?? [],
    bestCaseContents: bestCaseContents ?? [],
    bestCases: bestCases ?? [],
    lateDeliveries: lateDeliveries ?? {},
    inventoryTurnover: inventoryTurnover ?? {},
    stockRotation: stockRotation ?? {},
    shipmentsCount: shipmentsCount ?? {},
  };
};

export default withProtection(AnalyticsPage);
