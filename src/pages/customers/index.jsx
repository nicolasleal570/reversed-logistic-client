import { fetchCustomers } from '@api/customers/methods';
import { CustomersTable } from '@components/CustomersTable/CustomersTable';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';

function CustomersPage({ customers }) {
  return (
    <Layout
      title="Lista de clientes"
      description="Explora los clientes que disfrutan de tus servicios."
    >
      <CustomersTable customers={customers} />
    </Layout>
  );
}

CustomersPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let customers = [];
  if (data.token) {
    try {
      const res = await fetchCustomers(data.token);
      customers = res.data;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    customers: customers ?? [],
  };
};

export default withProtection(CustomersPage);
