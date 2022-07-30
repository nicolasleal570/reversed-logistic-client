import { useState } from 'react';
import classNames from 'classnames';
import { Switch } from '@headlessui/react';
import { fetchCase } from '@api/cases/methods';
import { parseCookies } from '@utils/parseCookies';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import OrderForm from '@components/OrderForm/OrderForm';
import { CaseSummary } from '@components/CaseSummary/CaseSummary';
import CaseForm from '@components/CaseForm/CaseForm';

function EditCasePage({ case: caseInfo, token }) {
  const [isEdit, setIsEdit] = useState(false);

  console.log(caseInfo);

  return (
    <Layout
      title={`${caseInfo.name}`}
      description="Información detallada de un case"
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
        <CaseForm
          case={caseInfo}
          token={token ?? ''}
          isEdit={isEdit}
          onlyRead={!isEdit}
        />
      ) : (
        <CaseSummary case={caseInfo} />
      )}
    </Layout>
  );
}

EditCasePage.getInitialProps = async ({ req, query }) => {
  const data = parseCookies(req);

  let caseItem = {};
  if (data.token) {
    try {
      const res = await fetchCase(query.id, data.token);

      caseItem = res.data;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    token: data?.token ?? '',
    case: caseItem ?? {},
  };
};

export default withProtection(EditCasePage);
