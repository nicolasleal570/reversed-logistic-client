import { withProtection } from '@components/withProtection';
import { Layout } from '@components/Layout/Layout';
import { AnalyticsSubmenu } from '@components/AnalyticsSubmenu/AnalyticsSubmenu';
import { BestCasesGraph } from '@components/Analytics/BestCases';
import { fetchBestCases } from '@api/analytics/methods';
import { parseCookies } from '@utils/parseCookies';

function CasesAnalytics({ bestCases }) {
  return (
    <Layout
      title="Analíticas y métricas sobre cases"
      description="Aquí podrás examinar todas las métricas correspondientes al módulo de cases."
    >
      <AnalyticsSubmenu />
      <div className="mt-8 w-full">
        <BestCasesGraph cases={bestCases} />
      </div>
    </Layout>
  );
}

CasesAnalytics.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let bestCases = [];

  if (data.token) {
    try {
      const { data: bestCasesData } = await fetchBestCases(data.token);

      bestCases = bestCasesData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    bestCases: bestCases ?? [],
  };
};

export default withProtection(CasesAnalytics);
