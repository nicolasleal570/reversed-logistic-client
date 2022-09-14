import { fetchShipments } from '@api/shipments/methods';
import { ShipmentsTable } from '@components/ShipmentsTable/ShipmentsTable';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';

function ShipmentsPage({ shipments }) {
  return (
    <Layout
      title="Lista de envíos"
      description="Explora los envíos que tienes pendientes y los que ya finalizaron."
    >
      <ShipmentsTable shipments={shipments} />
    </Layout>
  );
}

ShipmentsPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let shipments = [];
  if (data.token) {
    try {
      const res = await fetchShipments(data.token);
      shipments = res.data;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    shipments: shipments ?? [],
  };
};

export default withProtection(ShipmentsPage);
