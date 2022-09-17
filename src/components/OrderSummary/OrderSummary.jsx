import { useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { BadgeCheckIcon } from '@heroicons/react/solid';
import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';
import { formatPrice } from '@utils/formatPrice';
import classNames from 'classnames';
import { useOrders } from '@hooks/useOrders';
import { orderStatusColor } from '@components/OrdersTable/OrdersTable';

export function OrderSummary({ order }) {
  const router = useRouter();
  const { markOrderAsReady } = useOrders();
  const [doneItems, setDoneItems] = useState([]);

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

      <DataSection
        label="Estado"
        badge={{
          title: order?.orderStatus?.name,
          color: orderStatusColor[order?.orderStatus?.value],
        }}
      />

      <DataSection label="Total" value={formatPrice(order.total)} />

      <DataSection
        label="Fecha y hora de la compra"
        value={dayjs(order.purchaseDate).format('hh:mm A - dddd DD MMMM YYYY')}
      />

      <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
        Lista de productos
      </h2>

      {order.items.map((item, idx) => {
        const isDone = doneItems.includes(item.id);

        return (
          <div
            key={item.id}
            className="bg-white p-4 border border-gray-200 rounded mb-6"
          >
            <h3 className="flex items-center w-full text-md leading-7 font-medium">
              {isDone && (
                <span className="mr-1 text-green-500">
                  <BadgeCheckIcon className="w-6 h-6" />
                </span>
              )}
              <span>Case {idx + 1}</span>
            </h3>
            <DataSection label="Case" value={item.case.name} />
            <DataSection label="Sabor" value={item.caseContent.name} />
            <DataSection
              label="Cantidad de litros en case"
              value={`${item.quantity} L`}
            />

            {order.orderStatusId === 2 && (
              <button
                type="button"
                className={classNames(
                  'ml-auto border border-green-500 flex items-center px-3 py-2 rounded-lg text-sm',
                  {
                    'text-white bg-green-500': isDone,
                    'text-green-500 bg-white': !isDone,
                  }
                )}
                onClick={async () => {
                  if (doneItems.includes(item.id)) {
                    setDoneItems((oldData) =>
                      oldData.filter((elem) => elem !== item.id)
                    );
                  } else {
                    setDoneItems((oldData) => [...oldData, item.id]);
                  }
                }}
              >
                <span>
                  {isDone ? 'Marcar como faltante' : 'Marcar como listo'}
                </span>
              </button>
            )}
          </div>
        );
      })}

      <button
        type="button"
        className={classNames(
          'w-full flex items-center justify-center px-3 py-2.5 rounded-lg text-white bg-indigo-600 mt-8',
          {
            'text-gray-400 bg-gray-200':
              doneItems.length !== order.items.length,
          }
        )}
        disabled={doneItems.length !== order.items.length}
        onClick={async () => {
          await markOrderAsReady(order.id);
          router.push('/orders');
        }}
      >
        Finalizar pedido
      </button>
    </div>
  );
}
