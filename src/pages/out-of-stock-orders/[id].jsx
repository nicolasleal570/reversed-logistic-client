import { parseCookies } from '@utils/parseCookies';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { fetchOutOfStockOrder } from '@api/out-of-stock/methods';
import { OutOfStockOrderSummary } from '@components/OutOfStockOrderSummary/OutOfStockOrderSummary';

function EditOrderPage({ outOfStockOrder }) {
  console.log(outOfStockOrder);

  return (
    <Layout
      title={`Orden #OR${outOfStockOrder.id}`}
      description="Información detallada de la orden"
    >
      {outOfStockOrder?.orderStatus?.id === 1 && (
        <div className="mb-8 border-b border-gray-200 pb-8">HOLA MUNDO</div>
      )}

      <OutOfStockOrderSummary outOfStockOrder={outOfStockOrder} />
    </Layout>
  );
}

EditOrderPage.getInitialProps = async ({ req, query }) => {
  const data = parseCookies(req);

  let outOfStockOrder = {};
  if (data.token) {
    try {
      const res = await fetchOutOfStockOrder(query.id, data.token);

      outOfStockOrder = res.data;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    token: data?.token ?? '',
    outOfStockOrder: outOfStockOrder ?? {},
  };
};

export default withProtection(EditOrderPage);
