import { fetchOutOfStockOrders } from '@api/out-of-stock/methods';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';
import { OutOfStockOrdersTable } from '@components/OutOfStockOrdersTable/OutOfStockOrdersTable';

function OutOfStockOrdersPage({ outOfStockOrders }) {
  return (
    <Layout
      title="Lista de agotamientos"
      description="Explora cuales son los clientes que reportaron agotamiento en sus cases."
    >
      <OutOfStockOrdersTable outOfStockOrders={outOfStockOrders} />
    </Layout>
  );
}

OutOfStockOrdersPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let outOfStockOrders = [];
  if (data.token) {
    try {
      const res = await fetchOutOfStockOrders(data.token);
      outOfStockOrders = res.data;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    outOfStockOrders: outOfStockOrders ?? [],
  };
};

export default withProtection(OutOfStockOrdersPage);
