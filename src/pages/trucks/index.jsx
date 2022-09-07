import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';
import { TruckTable } from '@components/TruckTable/TruckTable';
import { fetchTrucks } from '@api/trucks/methods';

function TrucksPage({ trucks }) {
  return (
    <Layout
      title="Lista de vehículos y transporte"
      description="Explora los vehículos de transporte que tienes disponibles."
    >
      <TruckTable trucks={trucks} />
    </Layout>
  );
}

TrucksPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let trucks = [];
  if (data.token) {
    try {
      const res = await fetchTrucks(data.token);
      trucks = res.data;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    trucks: trucks ?? [],
  };
};

export default withProtection(TrucksPage);
