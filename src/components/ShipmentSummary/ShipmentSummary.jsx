import dayjs from 'dayjs';
import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';
import { formatDuration } from '@utils/formatDuration';
import { shipentStatusColor } from '@components/ShipmentsTable/ShipmentsTable';
import { OrderCard } from './OrderCard';

export function ShipmentSummary({ shipment, setShipment }) {
  const {
    trackNumber,
    shipmentAt,
    deliveredAt,
    truck,
    createdBy,
    createdAt,
    status,
    orders,
  } = shipment ?? {};

  return (
    <>
      <div className="w-full lg:w-96">
        <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
          Información del envío
        </h2>

        <DataSection label="Creado por" value={createdBy?.fullName} />

        <DataSection label="Identificador" value={trackNumber.toUpperCase()} />

        <DataSection
          label="Estado"
          badge={{
            title: status?.name,
            color: shipentStatusColor[status?.value],
          }}
        />

        <DataSection
          label="Fecha y hora cuando fue creado"
          value={dayjs(createdAt).format('hh:mm A - dddd DD MMMM YYYY')}
        />

        <DataSection
          label="Fecha y hora cuando fue enviado"
          value={
            shipmentAt
              ? dayjs(shipmentAt).format('hh:mm A - dddd DD MMMM YYYY')
              : '-'
          }
        />

        <DataSection
          label="Fecha y hora cuando fue entregado"
          value={
            deliveredAt
              ? dayjs(deliveredAt).format('hh:mm A - dddd DD MMMM YYYY')
              : '-'
          }
        />

        <DataSection
          label="Duración del envío"
          value={formatDuration(shipmentAt, deliveredAt)}
        />

        <DataSection
          label="Transporte"
          value={`${truck.licensePlate} - ${truck.model}, ${truck.brand}`}
          url={`/trucks/${truck.id}`}
        />

        <DataSection
          label="Conductor"
          value={truck?.driver?.fullName || '-'}
          url={truck?.driver ? `/users/${truck?.driver?.id}` : undefined}
        />
      </div>

      <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
        Órdenes asignadas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((item) => {
          return (
            <OrderCard
              shipment={shipment}
              setShipment={setShipment}
              order={item}
              key={item.id}
            />
          );
        })}
      </div>
    </>
  );
}
