import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';

export function UserSummary({ user }) {
  return (
    <div className="w-full lg:w-96">
      <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
        Información del usuario
      </h2>

      <DataSection label="Nombre" value={user.fullName} />

      <DataSection label="Email" value={user.email} />

      <DataSection label="Teléfono" value={user.phone} />
    </div>
  );
}
