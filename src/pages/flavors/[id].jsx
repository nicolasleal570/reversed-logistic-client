import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Switch } from '@headlessui/react';
import { fetchCaseContent } from '@api/cases/methods';
import { parseCookies } from '@utils/parseCookies';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { CaseContentSummary } from '@components/CaseContentSummary/CaseContentSummary';
import { CaseContentForm } from '@components/CaseContentForm/CaseContentForm';

function EditCaseContentPage({ caseContent: data, token }) {
  const [isEdit, setIsEdit] = useState(false);
  const [caseContent, setCaseContent] = useState({ ...data });

  useEffect(() => {
    setCaseContent(data);
  }, [data]);

  return (
    <Layout
      title={caseContent.name}
      description="Información detallada del sabor de cerveza"
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
        <CaseContentForm
          caseContent={caseContent}
          onUpdate={(updatedData) => {
            setCaseContent(updatedData);
            setIsEdit(false);
          }}
          token={token ?? ''}
          isEdit={isEdit}
          onlyRead={!isEdit}
        />
      ) : (
        <CaseContentSummary caseContent={caseContent} />
      )}
    </Layout>
  );
}

EditCaseContentPage.getInitialProps = async ({ req, query }) => {
  const data = parseCookies(req);

  let caseContent = {};
  if (data.token) {
    try {
      const res = await fetchCaseContent(query.id, data.token);

      caseContent = res.data;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    token: data?.token ?? '',
    caseContent: caseContent ?? {},
  };
};

export default withProtection(EditCaseContentPage);
