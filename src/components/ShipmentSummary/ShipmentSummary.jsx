import dayjs from 'dayjs';
import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';

export function ShipmentSummary({ shipment }) {
  const { trackNumber, shipmentAt, deliveredAt, truck, createdBy, createdAt } =
    shipment ?? {};

  const formatDuration = () => {
    const shipmentAtFormat = dayjs(shipmentAt || new Date());
    const deliveredAtFormat = dayjs(deliveredAt || new Date());
    let deliveryDuration = '-';

    if (shipmentAt && deliveredAt) {
      deliveryDuration = `${deliveredAtFormat.diff(
        shipmentAtFormat,
        'minute'
      )} minutos`;

      if (deliveryDuration > 60) {
        deliveryDuration = `${deliveredAtFormat.diff(
          shipmentAtFormat,
          'hour'
        )} horas`;
      }

      if (deliveryDuration > 24) {
        deliveryDuration = `${deliveredAtFormat.diff(
          shipmentAtFormat,
          'day'
        )} días`;
      }
    }

    return deliveryDuration;
  };

  return (
    <div className="w-full lg:w-96">
      <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
        Información del envío
      </h2>

      <DataSection label="Creado por" value={createdBy?.fullName} />

      <DataSection label="Identificador" value={trackNumber.toUpperCase()} />

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

      <DataSection label="Duración del envío" value={formatDuration()} />

      <DataSection
        label="Transporte"
        value={`${truck.licensePlate} - ${truck.model}, ${truck.brand}`}
      />

      <DataSection label="Conductor" value={truck?.driver?.fullName || '-'} />

      {/* <DataSection label="Descripción" value={caseInfo.description ?? '-'} />

      <DataSection
        label="Estatus"
        value={availableCasesState[caseInfo.state]?.title ?? '-'}
      />

      <DataSection label="Volumen" value={caseInfo.volume ?? '-'} />

      <DataSection label="Peso" value={caseInfo.weight ?? '-'} /> */}
    </div>
  );
}
