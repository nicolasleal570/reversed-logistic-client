import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';

export function CustomerSummary({ customer }) {
  return (
    <div className="w-full lg:w-96">
      <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
        Información del Cliente
      </h2>

      <DataSection label="Nombre de la empresa" value={customer.companyName} />

      <DataSection label="Descripción" value={customer.description || '-'} />

      <DataSection label="Rif" value={customer.rif} />

      <DataSection label="Página web" value={customer.website} />

      <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
        Sucursales
      </h2>

      {customer.locations.map((item, idx) => (
        <div
          key={item.id}
          className="bg-white p-4 pb-0 border border-gray-200 rounded mb-6"
        >
          <h3 className="block w-full text-md leading-7 font-medium">
            Sucursal {idx + 1}
          </h3>

          <DataSection label="Nombre" value={item.name} />

          <DataSection
            label="Dirección"
            value={`${item.line1}, ${item.city}. ${item.state}, ${item.country}`}
          />

          <DataSection label="Contacto" value={item.contact} />

          <DataSection
            label="Email asignado para reportar cases"
            value={item.email}
          />

          <DataSection label="Código postal" value={item.zipCode} />
        </div>
      ))}
    </div>
  );
}
