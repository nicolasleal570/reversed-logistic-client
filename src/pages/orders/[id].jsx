import { useEffect, useState } from 'react';
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
import { TakeOrderButton } from '@components/OrdersTable/TakeOrderButton';
import AssignShipmentModal from '@components/OrdersTable/AssignShipmentModal';
import { useUser } from '@hooks/useUser';

function EditOrderPage({ order: data, customers, cases, casesContent, token }) {
  const { user } = useUser();
  const [order, setOrder] = useState(data);
  const [isEdit, setIsEdit] = useState(false);
  const [isShipmentModalOpen, setIsShipmentModalOpen] = useState(false);

  const isResponsable = order?.assignedTo?.id === user?.id;

  useEffect(() => {
    setOrder(data);
  }, [data]);

  return (
    <Layout
      title={`Orden #OR${order.id}`}
      description="Información detallada de la orden"
    >
      {order.orderStatusId < 3 && isResponsable && (
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
      )}

      {order?.orderStatus?.value === 'QUEUED' && (
        <div className="mb-8 border-b border-gray-200 pb-8">
          <TakeOrderButton order={order} setOrder={setOrder} />
        </div>
      )}

      {order?.orderStatus?.value === 'FINISHED' && (
        <div className="mb-8 border-b border-gray-200 pb-8 flex items-center">
          <button
            type="button"
            className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2 disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-500"
            onClick={async () => {
              if (isResponsable) {
                setIsShipmentModalOpen(true);
              }
            }}
            disabled={!isResponsable}
          >
            <span>Asignar envío</span>
          </button>
          {!isResponsable && (
            <p className="text-gray-900 text-sm">
              Esta orden está siendo preparada por otro compañero!
            </p>
          )}
        </div>
      )}

      {isEdit ? (
        <OrderForm
          order={order}
          onUpdate={(updatedOrder) => {
            setOrder(updatedOrder);
            setIsEdit(false);
          }}
          customers={customers ?? []}
          cases={cases ?? []}
          casesContent={casesContent ?? []}
          token={token ?? ''}
          isEdit={isEdit}
          onlyRead={!isEdit}
        />
      ) : (
        <OrderSummary
          order={order}
          setOrder={setOrder}
          isResponsable={isResponsable}
        />
      )}

      {isShipmentModalOpen && (
        <AssignShipmentModal
          isOpen={isShipmentModalOpen}
          setIsOpen={setIsShipmentModalOpen}
          selectedOrder={order}
          setOrder={setOrder}
        />
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
