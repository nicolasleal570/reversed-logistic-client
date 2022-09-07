import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';
import { TruckForm } from '@components/TruckForm/TruckForm';

function CreateTruckPage({ token }) {
  return (
    <Layout
      title="Crear nuevo transporte"
      description="Crea un nuevo transporte para los envíos."
    >
      <TruckForm token={token} />
    </Layout>
  );
}

CreateTruckPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  return {
    token: data?.token ?? '',
  };
};

export default withProtection(CreateTruckPage);
