//import { useEffect, useState } from 'react';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';
import {
  fetchCustomers,
  fetchCustomersLocations,
} from '@api/customers/methods';
import { fetchCases, fetchCasesContent } from '@api/cases/methods';
import OrderForm from '@components/OrderForm/OrderForm';

function CreateOrderPage({ customers, cases, casesContent, token }) {
  return (
    <Layout title="Crear orden" description="Crea una nueva órden de venta.">
      <OrderForm
        customers={customers}
        cases={cases}
        casesContent={casesContent}
        token={token}
      />
    </Layout>
  );
}

CreateOrderPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let customers = [];
  let cases = [];
  let casesContent = [];
  if (data.token) {
    try {
      const res = await fetchCustomers(data.token);
      const { data: casesArr } = await fetchCases(data.token, {
        state: 'AVAILABLE',
      });
      const { data: casesContentArr } = await fetchCasesContent(data.token);
      customers = res.data;
      cases = casesArr;
      casesContent = casesContentArr;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    token: data?.token ?? '',
    customers: customers ?? [],
    cases: cases ?? [],
    casesContent: casesContent ?? [],
  };
};

export default withProtection(CreateOrderPage);
