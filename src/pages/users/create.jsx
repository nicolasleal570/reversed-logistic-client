import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { fetchRoles } from '@api/roles/methods';
import { parseCookies } from '@utils/parseCookies';
import { UserForm } from '@components/UserForm/UserForm';

function CreateUserPage({ roles }) {
  return (
    <Layout
      title="Crea un empleado"
      description="A continuación podrás crear un nuevo empleado para tu empresa"
    >
      <UserForm roles={roles} />
    </Layout>
  );
}

CreateUserPage.getInitialProps = async ({ req }) => {
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

export default withProtection(CreateUserPage);
