import { fetchCases } from '@api/cases/methods';
import { CasesTable } from '@components/CasesTable/CasesTable';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';

function CasesPage({ cases }) {
  return (
    <Layout
      title="Lista de cases"
      description="Explora los cases que tienes disponibles en tu empresa."
    >
      <CasesTable cases={cases} />
    </Layout>
  );
}

CasesPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let cases = [];
  if (data.token) {
    try {
      const res = await fetchCases(data.token);
      cases = res.data;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    cases: cases ?? [],
  };
};

export default withProtection(CasesPage);
