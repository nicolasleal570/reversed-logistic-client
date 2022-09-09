import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';
import { availableCasesState } from '@constants/availableCasesState';

export function CaseSummary({ case: caseInfo }) {
  return (
    <div className="w-full lg:w-96">
      <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
        Información del Case
      </h2>

      <DataSection label="Identificador" value={caseInfo.name} />

      <DataSection label="Descripción" value={caseInfo.description ?? '-'} />

      <DataSection
        label="Estatus"
        value={availableCasesState[caseInfo.state]?.title ?? '-'}
      />

      <DataSection label="Volumen" value={caseInfo.volume ?? '-'} />

      <DataSection label="Peso" value={caseInfo.weight ?? '-'} />
    </div>
  );
}
