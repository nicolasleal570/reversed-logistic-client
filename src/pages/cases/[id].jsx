import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { Switch } from '@headlessui/react';
import { fetchCase, fetchCases } from '@api/cases/methods';
import { parseCookies } from '@utils/parseCookies';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { CaseSummary } from '@components/CaseSummary/CaseSummary';
import CaseForm from '@components/CaseForm/CaseForm';
import CheckCaseHealthModal from '@components/CheckCaseHealthModal/CheckCaseHealthModal';
import { useCases } from '@hooks/useCases';

function EditCasePage({ case: data, cases, token }) {
  const { query } = useRouter();
  const { updateCase, deleteCase, recoveryCase } = useCases();
  const [caseInfo, setCaseInfo] = useState({ ...data });
  const [isEdit, setIsEdit] = useState(false);
  const [showCheckModal, setShowCheckModal] = useState(false);

  useEffect(() => {
    setCaseInfo(data);
  }, [data]);

  useEffect(() => {
    if (
      query.checkHealth === 'true' &&
      caseInfo &&
      caseInfo.state === 'PICKUP_DONE'
    ) {
      setShowCheckModal(true);
    }
  }, [query, caseInfo]);

  return (
    <Layout
      title={`${caseInfo.name}`}
      description="Información detallada de un case"
    >
      <div className="mb-8 border-b border-gray-200 pb-8 flex justify-between items-center">
        {!caseInfo.deletedAt && (
          <Switch.Group as="div">
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
        )}

        {!caseInfo.deletedAt && caseInfo.state === 'AVAILABLE' && (
          <button
            type="button"
            className="border border-red-600 text-red-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2 outline-none"
            onClick={async () => {
              const { data: updatedCase } = await deleteCase(caseInfo.id);
              setCaseInfo(updatedCase);
            }}
          >
            Deshabilitar
          </button>
        )}

        {caseInfo.deletedAt && (
          <div className="flex flex-col">
            <button
              type="button"
              className="border border-blue-600 text-blue-600 flex justify-center items-center px-3 py-3 rounded-lg text-sm mr-2 outline-none "
              onClick={async () => {
                const { data: updatedCase } = await recoveryCase(caseInfo.id);
                setCaseInfo(updatedCase);
              }}
            >
              Recuperar
            </button>
            <p className="text-sm mt-3 text-gray-800">
              <span className="font-bold">Inhabilitado el:</span> <br />{' '}
              {dayjs(caseInfo.deletedAt).format('hh:mm A - dddd DD MMMM YYYY')}
            </p>
          </div>
        )}
      </div>

      {caseInfo.state === 'OUT_OF_STOCK' &&
        caseInfo.currentOutOfStockOrderId >= 0 && (
          <div className="mb-8 border-b border-gray-200 pb-8">
            <Link
              href={`/out-of-stock-orders/${caseInfo.currentOutOfStockOrderId}`}
            >
              <a className="border border-indigo-600 text-indigo-600 inline-block px-3 py-2 rounded-lg text-sm mr-2">
                <span>Revisar orden de agotamiento</span>
              </a>
            </Link>
          </div>
        )}

      {caseInfo.state === 'PICKUP_DONE' && (
        <div className="mb-8 border-b border-gray-200 pb-8">
          <button
            type="button"
            className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
            onClick={() => setShowCheckModal(true)}
          >
            Examinar
          </button>
        </div>
      )}

      {caseInfo.state === 'CLEAN_PROCESS_DONE' && (
        <div className="mb-8 border-b border-gray-200 pb-8">
          <button
            type="button"
            className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
            onClick={async () => {
              const { data: updatedData } = await updateCase(caseInfo.id, {
                state: 'AVAILABLE',
              });
              setCaseInfo(updatedData);
            }}
          >
            Marcar como disponible
          </button>
        </div>
      )}

      {isEdit ? (
        <CaseForm
          case={caseInfo}
          cases={cases}
          onUpdate={(updatedCase) => {
            setCaseInfo(updatedCase);
            setIsEdit(false);
          }}
          token={token ?? ''}
          isEdit={isEdit}
          onlyRead={!isEdit}
        />
      ) : (
        <CaseSummary case={caseInfo} />
      )}

      {showCheckModal && (
        <CheckCaseHealthModal
          isOpen={showCheckModal}
          setIsOpen={setShowCheckModal}
          setCaseInfo={setCaseInfo}
        />
      )}
    </Layout>
  );
}

EditCasePage.getInitialProps = async ({ req, query }) => {
  const data = parseCookies(req);

  let caseItem = {};
  let cases = [];
  if (data.token) {
    try {
      const res = await fetchCase(query.id, data.token, { paranoid: false });
      const { data: casesData } = await fetchCases(data.token);

      caseItem = res.data;
      cases = casesData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    token: data?.token ?? '',
    case: caseItem ?? {},
    cases: cases ?? [],
  };
};

export default withProtection(EditCasePage);
