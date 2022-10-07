import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from '@utils/parseCookies';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { CleanProcessSummary } from '@components/CleanProcessSummary/CleanProcessSummary';
import { fetchCleanProcessOrder } from '@api/clean-process-order/methods';
import { useCleanProcess } from '@hooks/useCleanProcess';

function EditCleanProcessOrderPage({ cleanProcessOrder: data }) {
  const router = useRouter();
  const { startCleanProcess } = useCleanProcess();
  const [cleanProcessOrder, setCleanProcessOrder] = useState(data);

  useEffect(() => {
    setCleanProcessOrder(data);
  }, [data]);

  return (
    <Layout
      title={`Limpieza #LIM${cleanProcessOrder.id}`}
      description="Información detallada del proceso de limpieza"
    >
      {cleanProcessOrder.status.value === 'CLEAN_PROCESS_QUEUED' && (
        <div className="mb-8 border-b border-gray-200 pb-8">
          <button
            type="button"
            className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
            onClick={async () => {
              const { data: updatedCleanProcessOrder } =
                await startCleanProcess(cleanProcessOrder.id);
              setCleanProcessOrder({
                ...updatedCleanProcessOrder,
                steps: updatedCleanProcessOrder.steps.sort(
                  (a, b) => a.order - b.order
                ),
              });
            }}
          >
            <span>Comenzar limpieza</span>
          </button>
        </div>
      )}

      {cleanProcessOrder?.case?.state === 'CLEAN_PROCESS_DONE' && (
        <div className="mb-8 border-b border-gray-200 pb-8">
          <button
            type="button"
            className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
            onClick={async () =>
              router.push(`/cases/${cleanProcessOrder?.case?.id}`)
            }
          >
            <span>Revisar case</span>
          </button>
        </div>
      )}

      <CleanProcessSummary
        cleanProcessOrder={cleanProcessOrder}
        setCleanProcessOrder={setCleanProcessOrder}
      />
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
