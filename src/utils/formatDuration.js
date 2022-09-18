import dayjs from 'dayjs';

export const formatDuration = (shipmentAt, deliveredAt) => {
  const shipmentAtFormat = dayjs(shipmentAt || new Date());
  const deliveredAtFormat = dayjs(deliveredAt || new Date());
  let deliveryDuration = '-';

  if (shipmentAt && deliveredAt) {
    deliveryDuration = `${Math.abs(
      deliveredAtFormat.diff(shipmentAtFormat, 'minute')
    )} minutos`;

    if (deliveryDuration > 60) {
      deliveryDuration = `${Math.abs(
        deliveredAtFormat.diff(shipmentAtFormat, 'hour')
      )} horas`;
    }

    if (deliveryDuration > 24) {
      deliveryDuration = `${Math.abs(
        deliveredAtFormat.diff(shipmentAtFormat, 'day')
      )} días`;
    }
  }

  return deliveryDuration;
};
