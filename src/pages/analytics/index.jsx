import { withProtection } from '@components/withProtection';
import { Layout } from '@components/Layout/Layout';

function AnalyticsPage() {
  return (
    <Layout
      title="Analíticas y métricas"
      description="Aquí podrás examinar las métricas en tu línea de producción y así optimizar los puntos donde encuentres fallas."
    >
      Hola
    </Layout>
  );
}

export default withProtection(AnalyticsPage);
