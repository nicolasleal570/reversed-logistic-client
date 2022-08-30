import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';

export function ProcessStepSummary({ processStep }) {
  return (
    <div className="w-full lg:w-96">
      <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
        Información del proceso
      </h2>

      <DataSection label="Nombre" value={processStep.name} />

      <DataSection label="Descripción" value={processStep.description ?? '-'} />

      <DataSection
        label="Instrucciones"
        value={processStep.instructions ?? '-'}
      />

      <DataSection label="Guía" value={processStep.guidelines ?? '-'} />
    </div>
  );
}
