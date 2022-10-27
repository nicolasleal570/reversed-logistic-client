import dayjs from 'dayjs';
import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';
import { outOfStockOrderStatusColor } from '@components/OutOfStockOrdersTable/OutOfStockOrdersTable';
import Link from 'next/link';

export function OutOfStockOrderSummary({ outOfStockOrder }) {
  const {
    customerLocation,
    items,
    createdAt,
    pickedUpAt,
    doneAt,
    assignedTo,
    status,
  } = outOfStockOrder;

  return (
    <div className="w-full">
      <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
        Información de la órden de recogida
      </h2>

      <DataSection
        label="Responsable de la recogida"
        value={assignedTo?.fullName ?? '-'}
      />

      <DataSection
        label="Estado actual de la órden"
        badge={{
          title: status.name,
          color: outOfStockOrderStatusColor[status.value],
        }}
      />

      <DataSection
        label="Fecha y hora cuando fue creado"
        value={dayjs(createdAt).format('hh:mm A - dddd DD MMMM YYYY')}
      />

      <DataSection
        label="Fecha y hora cuando fue ido a buscar"
        value={
          pickedUpAt
            ? dayjs(pickedUpAt).format('hh:mm A - dddd DD MMMM YYYY')
            : '-'
        }
      />

      <DataSection
        label="Fecha y hora cuando fue entregado al almacén"
        value={
          doneAt ? dayjs(doneAt).format('hh:mm A - dddd DD MMMM YYYY') : '-'
        }
      />

      <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
        Información del cliente que solicta
      </h2>

      <DataSection
        label="Cliente"
        value={customerLocation.customer.companyName}
        url={`/customers/${customerLocation.customer.id}`}
      />

      <DataSection label="Sucursal" value={customerLocation.name} />

      <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
        Cases reportados
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => {
          return (
            <div
              key={item.id}
              className="bg-white p-4 border border-gray-200 rounded mb-6"
            >
              <h3 className="flex items-center w-full text-md leading-7 font-medium">
                <span>Case {idx + 1}</span>
              </h3>
              <DataSection label="Case" value={item.case.name} />
              <DataSection
                label="Contenido que tenía"
                value={item.caseContent.name}
              />
              <DataSection
                label="Orden de venta"
                value={`#OR${item.order.id}`}
              />

              <div className="flex items-end">
                {outOfStockOrder?.status?.value === 'PICKUP_DONE' && (
                  <Link href="/cases/[id]" as={`/cases/${item.case.id}`}>
                    <a className="ml-auto inline-block border border-indigo-600 text-indigo-600 px-3 py-2 rounded-lg text-sm">
                      Examinar
                    </a>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
