import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';
import { CaseContentForm } from '@components/CaseContentForm/CaseContentForm';

function CreateCaseContentPage({ token }) {
  return (
    <Layout
      title="Crear nuevo sabor"
      description="Crea un nuevo sabor para la venta."
    >
      <CaseContentForm token={token} />
    </Layout>
  );
}

CreateCaseContentPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  return {
    token: data?.token ?? '',
  };
};

export default withProtection(CreateCaseContentPage);
