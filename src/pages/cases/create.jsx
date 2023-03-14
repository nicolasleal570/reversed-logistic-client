//import { useEffect, useState } from 'react';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import CaseForm from '@components/CaseForm/CaseForm';
import { parseCookies } from '@utils/parseCookies';
import { fetchCases } from '@api/cases/methods';

function CreateCasePage({ token, cases }) {
  return (
    <Layout title="Crear case" description="Crea un nuevo case para la venta.">
      <CaseForm token={token} cases={cases} />
    </Layout>
  );
}

CreateCasePage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let cases = [];
  if (data.token) {
    try {
      const { data: casesData } = await fetchCases(data.token);

      cases = casesData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    token: data?.token ?? '',
    cases: cases ?? [],
  };
};

export default withProtection(CreateCasePage);
