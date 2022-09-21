import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';
import { ProcessStepForm } from '@components/ProcessStepForm/ProcessStepForm';

function CreateProcessStepPage({ token }) {
  return (
    <Layout
      title="Crear un proceso de limpieza"
      description="Crea un nuevo proceso de limpieza para las órdenes de mantenimiento de los cases."
    >
      <ProcessStepForm token={token} />
    </Layout>
  );
}

CreateProcessStepPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  return {
    token: data?.token ?? '',
  };
};

export default withProtection(CreateProcessStepPage);
