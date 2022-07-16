import { fetchUsers } from '@api/methods';
import { Layout } from '@components/Layout/Layout';
import UserTable from '@components/UserTable/UserTable';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';

function UsersPage({ users }) {
  return (
    <Layout
      title="Lista de usuarios"
      description="Explora los empleados de tu compañía, puedes crear nuevos o editar los ya existentes."
    >
      <UserTable users={users} />
    </Layout>
  );
}

UsersPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let users = [];
  if (data.token) {
    try {
      const res = await fetchUsers(data.token);
      users = res.data;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    users,
  };
};

export default withProtection(UsersPage);
