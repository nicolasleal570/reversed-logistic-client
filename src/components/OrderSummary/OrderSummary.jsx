import dayjs from 'dayjs';
import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';
import { formatPrice } from '@utils/formatPrice';

export function OrderSummary({ order }) {
  return (
    <div className="w-full lg:w-96">
      <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
        Información del Cliente
      </h2>

      <DataSection
        label="Cliente"
        value={order.customerLocation.customer.companyName}
      />

      <DataSection label="Sucursal" value={order.customerLocation.line1} />

      <DataSection
        label="Contacto de la sucursal"
        value={order.customerLocation.contact}
      />

      <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
        Información de la orden
      </h2>

      <DataSection label="Estado" value={order?.orderStatus?.name} />

      <DataSection label="Total" value={formatPrice(order.total)} />

      <DataSection
        label="Fecha y hora de la compra"
        value={dayjs(order.purchaseDate).format('hh:mm A - dddd DD MMMM YYYY')}
      />

      <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
        Lista de productos
      </h2>

      {order.items.map((item, idx) => (
        <div
          key={item.id}
          className="bg-white p-4 pb-0 border border-gray-200 rounded mb-6"
        >
          <h3 className="block w-full text-md leading-7 font-medium">
            Case {idx + 1}
          </h3>
          <DataSection label="Case" value={item.case.name} />
          <DataSection label="Sabor" value={item.caseContent.name} />
          <DataSection
            label="Cantidad de litros en case"
            value={`${item.quantity} L`}
          />
        </div>
      ))}
    </div>
  );
}
