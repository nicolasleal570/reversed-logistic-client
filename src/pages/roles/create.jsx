import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';
import { RoleForm } from '@components/RoleForm/RoleForm';
import { fetchPermissions } from '@api/permissions/methods';

function CreateTruckPage({ token, permissions }) {
  return (
    <Layout
      title="Crear nuevo rol"
      description="Crea un nuevo rol para los empleados."
    >
      <RoleForm permissions={permissions} token={token} />
    </Layout>
  );
}

CreateTruckPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let permissions = [];
  if (data.token) {
    try {
      const { data: permissionsData } = await fetchPermissions(data.token);

      permissions = permissionsData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    token: data?.token ?? '',
    permissions: permissions ?? [],
  };
};

export default withProtection(CreateTruckPage);
