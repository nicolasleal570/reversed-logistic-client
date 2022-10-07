import { useEffect, useState } from 'react';
import { useRouter, Link } from 'next/router';
import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';
import { availableCasesState } from '@constants/availableCasesState';
import CheckCaseHealthModal from '@components/CheckCaseHealthModal/CheckCaseHealthModal';
import { OrdersTable } from '@components/OrdersTable/OrdersTable';
import { useCases } from '@hooks/useCases';

export function CaseSummary({ case: rawCaseInfo }) {
  const { query } = useRouter();
  const { updateCase } = useCases();
  const [caseInfo, setCaseInfo] = useState({ ...rawCaseInfo });
  const [showCheckModal, setShowCheckModal] = useState(false);

  useEffect(() => {
    if (
      query.checkHealth === 'true' &&
      caseInfo &&
      caseInfo.state === 'PICKUP_DONE'
    ) {
      setShowCheckModal(true);
    }
  }, [query, caseInfo]);

  useEffect(() => {
    setCaseInfo(rawCaseInfo);
  }, [rawCaseInfo]);

  return (
    <>
      {caseInfo.state === 'OUT_OF_STOCK' &&
        caseInfo.currentOutOfStockOrderId >= 0 && (
          <Link
            href={{
              pathname: `/out-of-stock-orders/${caseInfo.currentOutOfStockOrderId}`,
            }}
          >
            <a className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2">
              Revisar orden
            </a>
          </Link>
        )}
      {caseInfo.state === 'PICKUP_DONE' && !showCheckModal && (
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
            Habilitar
          </button>
        </div>
      )}
      <div className="w-full lg:w-96">
        <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
          Información del Case
        </h2>

        <DataSection label="Identificador" value={caseInfo.name} />

        <DataSection label="Descripción" value={caseInfo.description ?? '-'} />

        <DataSection
          label="Estatus"
          badge={{
            title: availableCasesState[caseInfo.state]?.title ?? '-',
            color: availableCasesState[caseInfo.state]?.color,
          }}
        />

        <DataSection label="Volumen" value={caseInfo.volume ?? '-'} />

        <DataSection label="Peso" value={caseInfo.weight ?? '-'} />

        {showCheckModal && (
          <CheckCaseHealthModal
            isOpen={showCheckModal}
            setIsOpen={setShowCheckModal}
          />
        )}
      </div>
      {caseInfo?.orders?.length > 0 ? (
        <>
          <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
            Histórico de órdenes
          </h2>

          <OrdersTable
            orders={caseInfo?.orders || []}
            onlyTable
            deactivateSearchBar
          />
        </>
      ) : null}
    </>
  );
}
