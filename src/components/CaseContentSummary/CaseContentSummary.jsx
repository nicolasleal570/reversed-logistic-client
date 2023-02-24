import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';
import { OrdersTable } from '@components/OrdersTable/OrdersTable';

export function CaseContentSummary({ caseContent }) {
  return (
    <>
      <div className="w-full lg:w-96">
        <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
          Información sobre el sabor de la cerveza
        </h2>

        <DataSection label="Nombre" value={caseContent.name} />

        <DataSection
          label="Descripción"
          value={caseContent.description ?? '-'}
        />

        <DataSection label="Precio x litro" value={`$ ${caseContent.price}`} />
      </div>

      {caseContent?.orders?.length > 0 ? (
        <>
          <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
            Histórico de órdenes
          </h2>

          <OrdersTable
            orders={
              caseContent?.orders.sort(
                (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
              ) || []
            }
            onlyTable
            deactivateSearchBar
          />
        </>
      ) : null}
    </>
  );
}
