import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';
import { fetchRoles } from '@api/roles/methods';
import { RolesTable } from '@components/RolesTable/RolesTable';

function RolesPage({ roles }) {
  return (
    <Layout
      title="Lista de roles"
      description="Explora los roles disponibles para tus empleados."
    >
      <RolesTable roles={roles} />
    </Layout>
  );
}

RolesPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let roles = [];
  if (data.token) {
    try {
      const res = await fetchRoles(data.token);
      roles = res.data;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    roles: roles ?? [],
  };
};

export default withProtection(RolesPage);
