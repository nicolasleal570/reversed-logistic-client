import { withProtection } from '@components/withProtection';
import { Layout } from '@components/Layout/Layout';
import { AnalyticsSubmenu } from '@components/AnalyticsSubmenu/AnalyticsSubmenu';

function AnalyticsPage() {
  return (
    <Layout
      title="Analíticas y métricas sobre cases"
      description="Aquí podrás examinar todas las métricas correspondientes al módulo de cases."
    >
      <AnalyticsSubmenu />

      <div className="bg-blue-400 mt-8">ANALITICAS MAAIN MENU</div>
    </Layout>
  );
}

export default withProtection(AnalyticsPage);
