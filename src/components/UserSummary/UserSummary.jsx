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

      {user.roles.length > 0 && (
        <>
          <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
            Roles
          </h2>

          {user.roles.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 pb-0 border border-gray-200 rounded mb-6"
            >
              <h3 className="block w-full text-md leading-7 font-medium">
                {item.name}
              </h3>

              <DataSection label="Descripción" value={item.description} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
