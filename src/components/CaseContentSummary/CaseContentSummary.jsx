import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';

export function CaseContentSummary({ caseContent }) {
  return (
    <div className="w-full lg:w-96">
      <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
        Información sobre el sabor de la cerveza
      </h2>

      <DataSection label="Nombre" value={caseContent.name} />

      <DataSection label="Descripción" value={caseContent.description ?? '-'} />

      <DataSection label="Precio x litro" value={`$ ${caseContent.price}`} />
    </div>
  );
}
