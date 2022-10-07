import { fetchOrders, fetchOrderStatus } from '@api/orders/methods';
import { Layout } from '@components/Layout/Layout';
import { OrdersTable } from '@components/OrdersTable/OrdersTable';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';

function OrdersPage({ orders, orderStatus }) {
  return (
    <Layout
      title="Lista de órdenes"
      description="Explora las órdenes que se crearon."
    >
      <OrdersTable
        orders={orders.sort((a, b) => a.orderStatus.id - b.orderStatus.id)}
        href="/orders/create"
        as="/orders/create"
        filterTabs={orderStatus.map((item) => ({
          title: item.name,
          value: item.value,
        }))}
      />
    </Layout>
  );
}

OrdersPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let orders = [];
  let orderStatus = [];
  if (data.token) {
    try {
      const res = await fetchOrders(data.token);
      const { data: orderStatusData } = await fetchOrderStatus(data.token);
      orders = res.data;
      orderStatus = orderStatusData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    orders: orders ?? [],
    orderStatus: orderStatus ?? [],
  };
};

export default withProtection(OrdersPage);
