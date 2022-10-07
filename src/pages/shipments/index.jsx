import { fetchShipments, fetchShipmentStatus } from '@api/shipments/methods';
import { ShipmentsTable } from '@components/ShipmentsTable/ShipmentsTable';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';

function ShipmentsPage({ shipments, shipmentStatus }) {
  return (
    <Layout
      title="Lista de envíos"
      description="Explora los envíos que tienes pendientes y los que ya finalizaron."
    >
      <ShipmentsTable
        shipments={shipments.sort((a, b) => a.status.id - b.status.id)}
        filterTabs={shipmentStatus.map((item) => ({
          title: item.name,
          value: item.value,
        }))}
      />
    </Layout>
  );
}

ShipmentsPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let shipments = [];
  let shipmentStatus = [];
  if (data.token) {
    try {
      const res = await fetchShipments(data.token);
      const { data: statusData } = await fetchShipmentStatus(data.token);
      shipments = res.data;
      shipmentStatus = statusData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    shipments: shipments ?? [],
    shipmentStatus: shipmentStatus ?? [],
  };
};

export default withProtection(ShipmentsPage);
