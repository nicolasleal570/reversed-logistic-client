import { fetchCasesContent } from '@api/cases/methods';
import { Layout } from '@components/Layout/Layout';
import { CasesContentTable } from '@components/CasesContentTable/CasesContentTable';
import { withProtection } from '@components/withProtection';
import { parseCookies } from '@utils/parseCookies';

function CasesContentPage({ casesContent }) {
  return (
    <Layout
      title="Lista de sabores de cerveza"
      description="Explora los sabores de cerveza que tienes disponibles en tu empresa."
    >
      <CasesContentTable casesContent={casesContent} />
    </Layout>
  );
}

CasesContentPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let casesContent = [];
  if (data.token) {
    try {
      const res = await fetchCasesContent(data.token);
      casesContent = res.data;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    casesContent: casesContent ?? [],
  };
};

export default withProtection(CasesContentPage);
