import { withProtection } from '@components/withProtection';
import { Layout } from '@components/Layout/Layout';
import { AnalyticsSubmenu } from '@components/AnalyticsSubmenu/AnalyticsSubmenu';
import { BestCaseContentsGraph } from '@components/Analytics/BestCaseContents';
import { fetchBestCaseContents } from '@api/analytics/methods';
import { parseCookies } from '@utils/parseCookies';

function FlavorsAnalytics({ bestCaseContents }) {
  return (
    <Layout
      title="Analíticas y métricas sobre sabores"
      description="Aquí podrás examinar todas las métricas correspondientes al módulo de sabores."
    >
      <AnalyticsSubmenu />
      <div className="mt-8 w-full">
        <BestCaseContentsGraph caseContents={bestCaseContents} />
      </div>
    </Layout>
  );
}

FlavorsAnalytics.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let bestCaseContents = [];

  if (data.token) {
    try {
      const { data: bestCaseContentsData } = await fetchBestCaseContents(
        data.token
      );

      bestCaseContents = bestCaseContentsData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    bestCaseContents: bestCaseContents ?? [],
  };
};

export default withProtection(FlavorsAnalytics);
