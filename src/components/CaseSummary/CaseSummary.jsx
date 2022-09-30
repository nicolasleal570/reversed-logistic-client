import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';
import { availableCasesState } from '@constants/availableCasesState';
import CheckCaseHealthModal from '@components/CheckCaseHealthModal/CheckCaseHealthModal';
import { OrdersTable } from '@components/OrdersTable/OrdersTable';

export function CaseSummary({ case: caseInfo }) {
  const { query } = useRouter();
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

  return (
    <>
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
