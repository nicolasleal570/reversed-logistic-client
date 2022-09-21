import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';
import { RoleForm } from '@components/RoleForm/RoleForm';

function CreateTruckPage({ token }) {
  return (
    <Layout
      title="Crear nuevo rol"
      description="Crea un nuevo rol para los empleados."
    >
      <RoleForm token={token} />
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
