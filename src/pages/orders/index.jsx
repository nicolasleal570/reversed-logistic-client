import { fetchOrders } from '@api/orders/methods';
import { Layout } from '@components/Layout/Layout';
import { OrdersTable } from '@components/OrdersTable/OrdersTable';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';

function OrdersPage({ orders }) {
  console.log(orders);
  return (
    <Layout
      title="Lista de órdenes"
      description="Explora las órdenes que se crearon."
    >
      <OrdersTable orders={orders} href="/orders/create" as="/orders/create" />
    </Layout>
  );
}

OrdersPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let orders = [];
  if (data.token) {
    try {
      const res = await fetchOrders(data.token);
      orders = res.data;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    orders: orders ?? [],
  };
};

export default withProtection(OrdersPage);
