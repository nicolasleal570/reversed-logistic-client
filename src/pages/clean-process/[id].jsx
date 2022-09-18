import { parseCookies } from '@utils/parseCookies';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { CleanProcessSummary } from '@components/CleanProcessSummary/CleanProcessSummary';
import { fetchCleanProcessOrder } from '@api/clean-process-order/methods';

function EditCleanProcessOrderPage({ cleanProcessOrder }) {
  return (
    <Layout
      title={`Orden #OR`}
      description="Información detallada del proceso de limpieza"
    >
      <CleanProcessSummary cleanProcessOrder={cleanProcessOrder} />
    </Layout>
  );
}

EditCleanProcessOrderPage.getInitialProps = async ({ req, query }) => {
  const cookies = parseCookies(req);

  let cleanProcessOrder = {};
  if (cookies.token) {
    try {
      const { data: ordersList } = await fetchCleanProcessOrder(
        query.id,
        cookies.token
      );

      cleanProcessOrder = {
        ...ordersList,
        steps: ordersList.steps.sort((a, b) => a.order - b.order),
      };
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    token: cookies?.token ?? '',
    cleanProcessOrder: cleanProcessOrder ?? {},
  };
};

export default withProtection(EditCleanProcessOrderPage);
