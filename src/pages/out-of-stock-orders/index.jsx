import {
  fetchOutOfStockOrders,
  fetchOutOfStockStatus,
} from '@api/out-of-stock/methods';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';
import { OutOfStockOrdersTable } from '@components/OutOfStockOrdersTable/OutOfStockOrdersTable';

function OutOfStockOrdersPage({ outOfStockOrders, outOfStockStatus }) {
  return (
    <Layout
      title="Lista de agotamientos"
      description="Explora cuales son los clientes que reportaron agotamiento en sus cases."
    >
      <OutOfStockOrdersTable
        outOfStockOrders={outOfStockOrders}
        filterTabs={outOfStockStatus.map((item) => ({
          title: item.name,
          value: item.value,
        }))}
      />
    </Layout>
  );
}

OutOfStockOrdersPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let outOfStockOrders = [];
  let outOfStockStatus = [];
  if (data.token) {
    try {
      const res = await fetchOutOfStockOrders(data.token);
      const { data: statusData } = await fetchOutOfStockStatus(data.token);
      outOfStockOrders = res.data;
      outOfStockStatus = statusData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    outOfStockOrders: outOfStockOrders ?? [],
    outOfStockStatus: outOfStockStatus ?? [],
  };
};

export default withProtection(OutOfStockOrdersPage);
