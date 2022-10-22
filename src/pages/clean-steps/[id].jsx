import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Switch } from '@headlessui/react';
import { parseCookies } from '@utils/parseCookies';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { fetchProcessStep } from '@api/process-steps/methods';
import { ProcessStepSummary } from '@components/ProcessStepSummary/ProcessStepSummary';
import { ProcessStepForm } from '@components/ProcessStepForm/ProcessStepForm';

function EditProcessStepPage({ processStep: data, token }) {
  const [processStep, setProcessStep] = useState({ ...data });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setProcessStep(data);
  }, [data]);

  return (
    <Layout
      title={`${processStep.name}`}
      description="Información detallada del proceso de limpieza"
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
        <ProcessStepForm
          processStep={processStep}
          token={token ?? ''}
          isEdit={isEdit}
          onlyRead={!isEdit}
          onUpdate={(updatedStep) => {
            setProcessStep(updatedStep);
            setIsEdit(false);
          }}
        />
      ) : (
        <ProcessStepSummary processStep={processStep} />
      )}
    </Layout>
  );
}

EditProcessStepPage.getInitialProps = async ({ req, query }) => {
  const data = parseCookies(req);

  let processStep = {};
  if (data.token) {
    try {
      const res = await fetchProcessStep(query.id, data.token);

      processStep = res.data;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    token: data?.token ?? '',
    processStep: processStep ?? {},
  };
};

export default withProtection(EditProcessStepPage);
