import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';

export function RoleSummary({ role }) {
  return (
    <div className="w-full lg:w-96">
      <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
        Información sobre el rol
      </h2>

      <DataSection label="Nombre" value={role.name} />
      <DataSection label="Descripción" value={role.description} />
    </div>
  );
}
