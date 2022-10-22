import { useMemo } from 'react';
import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';
import { OrdersTable } from '@components/OrdersTable/OrdersTable';

export function CustomerSummary({ customer }) {
  const orders = useMemo(() => {
    const items = [];
    customer.locations.forEach((item) => items.push(...item.orders));

    return items;
  }, [customer]);

  return (
    <>
      <div className="w-full">
        <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
          Información del Cliente
        </h2>

        <DataSection
          label="Nombre de la empresa"
          value={customer.companyName}
        />

        <DataSection label="Descripción" value={customer.description || '-'} />

        <DataSection label="Rif" value={customer.rif} />

        <DataSection label="Página web" value={customer.website} />

        <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
          Sucursales
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {customer.locations.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 pb-0 border border-gray-200 rounded mb-6"
          >
            <h3 className="block w-full text-md leading-7 font-medium">
              {item.name}
            </h3>

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

      {orders?.length > 0 ? (
        <>
          <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
            Histórico de órdenes
          </h2>

          <OrdersTable orders={orders || []} onlyTable deactivateSearchBar />
        </>
      ) : null}
    </>
  );
}
