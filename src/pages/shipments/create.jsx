import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';
import { ShipmentForm } from '@components/ShipmentForm/ShipmentForm';
import { fetchTrucks } from '@api/trucks/methods';

function CreateShipmentPage({ token, trucks }) {
  return (
    <Layout
      title="Crear órden envío"
      description="Crea una nueva órden de envío de cases para los clientes."
    >
      <ShipmentForm trucks={trucks} token={token} />
    </Layout>
  );
}

CreateShipmentPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let trucks = [];
  if (data.token) {
    try {
      const { token } = data;
      const [{ data: trucksData }] = await Promise.all([fetchTrucks(token)]);

      trucks = trucksData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    token: data?.token ?? '',
    trucks: trucks ?? [],
  };
};

export default withProtection(CreateShipmentPage);
