import { withProtection } from '@components/withProtection';
import { Layout } from '@components/Layout/Layout';
import { AnalyticsSubmenu } from '@components/AnalyticsSubmenu/AnalyticsSubmenu';
import { BestCasesGraph } from '@components/Analytics/BestCases';
import { BestCaseContentsGraph } from '@components/Analytics/BestCaseContents';
import {
  fetchBestCases,
  fetchBestCaseContents,
  fetchInventoryTurnover,
} from '@api/analytics/methods';
import { parseCookies } from '@utils/parseCookies';
import { InventoryTurnoverGraph } from '@components/Analytics/InventoryTurnover';

function CasesAnalytics({ bestCases, bestCaseContents, inventoryTurnover }) {
  return (
    <Layout
      title="Analíticas y métricas sobre cases"
      description="Aquí podrás examinar todas las métricas correspondientes al módulo de cases."
    >
      <AnalyticsSubmenu />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 w-full">
        <InventoryTurnoverGraph inventoryTurnover={inventoryTurnover} />
      </div>

      <div className="grid grid-cols-1 gap-8 mt-8 w-full">
        <BestCasesGraph cases={bestCases} />
        <BestCaseContentsGraph caseContents={bestCaseContents} />
      </div>
    </Layout>
  );
}

CasesAnalytics.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  let bestCases = [];
  let bestCaseContents = [];
  let inventoryTurnover = {};

  if (data.token) {
    try {
      const { data: bestCasesData } = await fetchBestCases(data.token);
      const { data: bestCaseContentsData } = await fetchBestCaseContents(
        data.token
      );
      const { data: inventoryTurnoverData } = await fetchInventoryTurnover(
        data.token
      );

      bestCases = bestCasesData;
      bestCaseContents = bestCaseContentsData;
      inventoryTurnover = inventoryTurnoverData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    bestCases: bestCases ?? [],
    bestCaseContents: bestCaseContents ?? [],
    inventoryTurnover: inventoryTurnover ?? {},
  };
};

export default withProtection(CasesAnalytics);
