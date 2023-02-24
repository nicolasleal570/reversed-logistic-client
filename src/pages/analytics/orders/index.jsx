import dayjs from 'dayjs';
import { withProtection } from '@components/withProtection';
import { Layout } from '@components/Layout/Layout';
import { AnalyticsSubmenu } from '@components/AnalyticsSubmenu/AnalyticsSubmenu';
import {
  fetchDeliveryAtTime,
  fetchLateDeliveries,
  fetchShipmentsCount,
} from '@api/analytics/methods';
import { parseCookies } from '@utils/parseCookies';
import { DeliveryAtTimeGraph } from '@components/Analytics/DeliveryAtTimeGraph';
import { ShipmentsCountGraph } from '@components/Analytics/ShipmentsCountGraph';
import { LateDeliveriesGraph } from '@components/Analytics/LateDeliveriesGraph';
import { AnalyticsDateSelectors } from '@components/Analytics/AnalyticsDateSelectors';

function OrdersAnalytics({ deliveryAtTime, shipmentsCount, lateDeliveries }) {
  const onSubmit = () => {};
  return (
    <Layout
      title="Analíticas y métricas sobre sabores"
      description="Aquí podrás examinar todas las métricas correspondientes al módulo de sabores."
    >
        <div className="flex items-center justify-between">
          <div className="mr-auto">
            <AnalyticsDateSelectors onSubmit={onSubmit} />
          </div>

          <AnalyticsSubmenu />
        </div>
        <div className="mt-8 w-full grid grid-cols-1 gap-8">
          <DeliveryAtTimeGraph deliveryAtTime={deliveryAtTime} />
          <ShipmentsCountGraph shipmentsCount={shipmentsCount} />
          <LateDeliveriesGraph lateDeliveries={lateDeliveries} />
        </div>
    </Layout>
  );
}

OrdersAnalytics.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let deliveryAtTime = [];
  let shipmentsCount = {};
  let lateDeliveries = {};

  if (data.token) {
    try {
      const currentMonth = dayjs().month();

      const { data: deliveryAtTimeData } = await fetchDeliveryAtTime(
        data.token
      );
      const { data: shipmentsCountData } = await fetchShipmentsCount(
        data.token,
        { month: currentMonth }
      );

      const { data: lateDeliveriesData } = await fetchLateDeliveries(
        data.token
      );

      deliveryAtTime = deliveryAtTimeData;
      shipmentsCount = shipmentsCountData;
      lateDeliveries = lateDeliveriesData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    deliveryAtTime: deliveryAtTime ?? [],
    shipmentsCount: shipmentsCount ?? {},
    lateDeliveries: lateDeliveries ?? [],
  };
};

export default withProtection(OrdersAnalytics);
