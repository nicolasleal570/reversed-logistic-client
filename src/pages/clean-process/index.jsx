import { Layout } from '@components/Layout/Layout';
import { CleanProcessTable } from '@components/CleanProcessTable/CleanProcessTable';
import { withProtection } from '@components/withProtection';
import {
  fetchCleanProcessOrders,
  fetchCleanProcessOrderStatus,
} from '@api/clean-process-order/methods';
import { parseCookies } from '@utils/parseCookies';

function CleanProcessPage({ cleanProcessOrders, cleanProcessOrderStatus }) {
  return (
    <Layout
      title="Lista de procesos de limpieza"
      description="Explora los procesos de limpieza de los cases y su estatus."
    >
      <CleanProcessTable
        cleanProcessOrders={cleanProcessOrders}
        filterTabs={cleanProcessOrderStatus.map((item) => ({
          title: item.name,
          value: item.value,
        }))}
      />
    </Layout>
  );
}

CleanProcessPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let cleanProcessOrders = [];
  let cleanProcessOrderStatus = [];
  if (data.token) {
    try {
      const res = await fetchCleanProcessOrders(data.token);
      const { data: cleanProcessOrderStatusData } =
        await fetchCleanProcessOrderStatus(data.token);
      cleanProcessOrders = res.data;
      cleanProcessOrderStatus = cleanProcessOrderStatusData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    cleanProcessOrders: cleanProcessOrders ?? [],
    cleanProcessOrderStatus: cleanProcessOrderStatus ?? [],
  };
};

export default withProtection(CleanProcessPage);
