import { useState } from 'react';
import classNames from 'classnames';
import { Switch } from '@headlessui/react';
import { parseCookies } from '@utils/parseCookies';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { fetchCustomer } from '@api/customers/methods';
import { CustomerSummary } from '@components/CustomerSummary/CustomerSummary';
import CustomerForm from '@components/CustomerForm/CustomerForm';

function EditCustomerPage({ customer, token }) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Layout
      title={`${customer.companyName}`}
      description="Información detallada del cliente/empresa"
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
        <CustomerForm
          customer={customer}
          token={token ?? ''}
          isEdit={isEdit}
          onlyRead={!isEdit}
        />
      ) : (
        <CustomerSummary customer={customer} />
      )}
    </Layout>
  );
}

EditCustomerPage.getInitialProps = async ({ req, query }) => {
  const data = parseCookies(req);

  let customer = {};
  if (data.token) {
    try {
      const res = await fetchCustomer(query.id, data.token);

      customer = res.data;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    token: data?.token ?? '',
    customer: customer ?? {},
  };
};

export default withProtection(EditCustomerPage);
