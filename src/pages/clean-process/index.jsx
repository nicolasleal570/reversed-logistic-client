import { Layout } from '@components/Layout/Layout';
import { CleanProcessTable } from '@components/CleanProcessTable/CleanProcessTable';
import { withProtection } from '@components/withProtection';
import { fetchCleanProcessOrders } from '@api/clean-process-order/methods';
import { parseCookies } from '@utils/parseCookies';

function CleanProcessPage({ cleanProcessOrders }) {
  return (
    <Layout
      title="Lista de procesos de limpieza"
      description="Explora los procesos de limpieza de los cases y su estatus."
    >
      <CleanProcessTable cleanProcessOrders={cleanProcessOrders} />
    </Layout>
  );
}

CleanProcessPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let cleanProcessOrders = [];
  if (data.token) {
    try {
      const res = await fetchCleanProcessOrders(data.token);
      cleanProcessOrders = res.data;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    cleanProcessOrders: cleanProcessOrders ?? [],
  };
};

export default withProtection(CleanProcessPage);
