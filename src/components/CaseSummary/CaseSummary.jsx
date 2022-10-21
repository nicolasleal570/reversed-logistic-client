import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';
import { availableCasesState } from '@constants/availableCasesState';
import { OrdersTable } from '@components/OrdersTable/OrdersTable';

export function CaseSummary({ case: caseInfo }) {
  return (
    <>
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
