//import { useEffect, useState } from 'react';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import CaseForm from '@components/CaseForm/CaseForm';
import { parseCookies } from '@utils/parseCookies';

function CreateCasePage({ token }) {
  return (
    <Layout title="Crear case" description="Crea un nuevo case para la venta.">
      <CaseForm token={token} />
    </Layout>
  );
}

CreateCasePage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  return {
    token: data?.token ?? '',
  };
};

export default withProtection(CreateCasePage);
