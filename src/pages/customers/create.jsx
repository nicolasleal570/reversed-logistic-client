//import { useEffect, useState } from 'react';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';
import CustomerForm from '@components/CustomerForm/CustomerForm';

function CreateCustomerPage({ token }) {
  return (
    <Layout
      title="Crear cliente"
      description="Crea un nuevo cliente en tu empresa."
    >
      <CustomerForm token={token} />
    </Layout>
  );
}

CreateCustomerPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  return {
    token: data?.token ?? '',
  };
};

export default withProtection(CreateCustomerPage);
