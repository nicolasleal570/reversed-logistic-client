import { fetchProcessSteps } from '@api/process-steps/methods';
import { Layout } from '@components/Layout/Layout';
import { ProcessStepsTable } from '@components/ProcessStepsTable/ProcessStepsTable';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';

function CleanProcessStepsPage({ processSteps }) {
  return (
    <Layout
      title="Lista de procesos de limpieza"
      description="Explora los procesos de limpieza de los cases y su estatus."
    >
      <ProcessStepsTable processSteps={processSteps} />
    </Layout>
  );
}

CleanProcessStepsPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let processSteps = [];
  if (data.token) {
    try {
      const res = await fetchProcessSteps(data.token);
      processSteps = res.data;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    processSteps: processSteps ?? [],
  };
};

export default withProtection(CleanProcessStepsPage);
