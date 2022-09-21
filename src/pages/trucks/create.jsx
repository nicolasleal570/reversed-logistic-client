import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';
import { TruckForm } from '@components/TruckForm/TruckForm';
import { fetchUsers } from '@api/users/methods';

function CreateTruckPage({ token, employees }) {
  return (
    <Layout
      title="Crear nuevo transporte"
      description="Crea un nuevo transporte para los envíos."
    >
      <TruckForm token={token} employees={employees} />
    </Layout>
  );
}

CreateTruckPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let employees = [];
  if (data.token) {
    try {
      const res = await fetchUsers(data.token);
      employees = res.data;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    token: data?.token ?? '',
    employees: employees ?? [],
  };
};

export default withProtection(CreateTruckPage);
