import { useState } from 'react';
import classNames from 'classnames';
import { Switch } from '@headlessui/react';
import { fetchCustomers } from '@api/customers/methods';
import { fetchCases, fetchCasesContent } from '@api/cases/methods';
import { fetchOrder } from '@api/orders/methods';
import { parseCookies } from '@utils/parseCookies';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import OrderForm from '@components/OrderForm/OrderForm';
import { OrderSummary } from '@components/OrderSummary/OrderSummary';

function EditOrderPage({ order, customers, cases, casesContent, token }) {
  const [isEdit, setIsEdit] = useState(false);

  console.log(order);

  return (
    <Layout
      title={`Orden #OR${order.id}`}
      description="Información detallada de la orden"
    >
      <div className="mb-8 border-b border-gray-200 pb-8">
        <Switch.Group>
          <>
            <Switch.Label className="mr-4">Habilitar edición</Switch.Label>
            <Switch
              checked={isEdit}
              onChange={setIsEdit}
              className={classNames(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                {
                  'bg-indigo-600': isEdit,
                  'bg-gray-200': !isEdit,
                }
              )}
            >
              <span
                className={classNames(
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  {
                    'translate-x-6': isEdit,
                    'translate-x-1': !isEdit,
                  }
                )}
              />
            </Switch>
          </>
        </Switch.Group>
      </div>

      {isEdit ? (
        <OrderForm
          order={order}
          customers={customers ?? []}
          cases={cases ?? []}
          casesContent={casesContent ?? []}
          token={token ?? ''}
          isEdit={isEdit}
          onlyRead={!isEdit}
        />
      ) : (
        <OrderSummary order={order} />
      )}
    </Layout>
  );
}

EditOrderPage.getInitialProps = async ({ req, query }) => {
  const data = parseCookies(req);

  let order = {};
  let customers = [];
  let cases = [];
  let casesContent = [];
  if (data.token) {
    try {
      const res = await fetchCustomers(data.token);
      const { data: orderItem } = await fetchOrder(query.id, data.token);
      const { data: casesArr } = await fetchCases(data.token);
      const { data: casesContentArr } = await fetchCasesContent(data.token);

      order = orderItem;
      customers = res.data;
      cases = casesArr;
      casesContent = casesContentArr;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    token: data?.token ?? '',
    customers: customers ?? [],
    cases: cases ?? [],
    casesContent: casesContent ?? [],
    order: order ?? {},
  };
};

export default withProtection(EditOrderPage);