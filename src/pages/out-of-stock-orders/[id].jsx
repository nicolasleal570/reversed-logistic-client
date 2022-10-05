import { useRouter } from 'next/router';
import { parseCookies } from '@utils/parseCookies';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { fetchOutOfStockOrder } from '@api/out-of-stock/methods';
import { OutOfStockOrderSummary } from '@components/OutOfStockOrderSummary/OutOfStockOrderSummary';
import { useOutOfStockOrders } from '@hooks/useOutOfStockOrders';
import { useEffect, useState } from 'react';

function EditOrderPage({ outOfStockOrder: data }) {
  const router = useRouter();
  const [outOfStockOrder, setOutOfStockOrder] = useState(data);
  const { takeOutOfStockOrder, finishOutOfStockOrder } = useOutOfStockOrders();

  useEffect(() => {
    setOutOfStockOrder(data);
  }, [data]);

  return (
    <Layout
      title={`Orden #OR${outOfStockOrder.id}`}
      description="Información detallada de la orden"
    >
      {outOfStockOrder?.status?.value === 'PICKUP_IN_PROGRESS' && (
        <div className="mb-8 border-b border-gray-200 pb-8">
          <button
            type="button"
            className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
            onClick={async () => {
              const { data: updatedData } = await finishOutOfStockOrder({
                id: outOfStockOrder.id,
              });
              setOutOfStockOrder(updatedData);
            }}
          >
            <span>Entregar la recogida</span>
          </button>
        </div>
      )}

      {outOfStockOrder?.status?.value === 'OUT_OF_STOCK' && (
        <div className="mb-8 border-b border-gray-200 pb-8">
          <button
            type="button"
            className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
            onClick={async () => {
              const { data: updatedData } = await takeOutOfStockOrder({
                id: outOfStockOrder.id,
              });
              setOutOfStockOrder(updatedData);
            }}
          >
            <span>Comenzar la recogida</span>
          </button>
        </div>
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
