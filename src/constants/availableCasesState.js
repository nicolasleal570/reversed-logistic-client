export const availableCasesState = {
  AVAILABLE: {
    title: 'Disponible',
    color: 'lime',
  },
  QUEUED: {
    title: 'En cola de llenado',
    color: 'blue',
  },
  IN_TRANSIT: {
    title: 'En proceso de llenado',
    color: 'orange',
  },
  FINISHED: {
    title: 'Llenado listo',
    color: 'violet',
  },
  WAITING_SHIPMENT: {
    title: 'Esperando que sea enviado',
    color: 'yellow',
  },
  IN_SHIPMENT: {
    title: 'Ya fue enviado',
    color: 'cyan',
  },
  SHIPMENT_DONE: {
    title: 'En uso',
    color: 'green',
  },
  OUT_OF_STOCK: {
    title: 'Reportado como agotado',
    color: 'red',
  },
  PICKUP_IN_PROGRESS: {
    title: 'Esperando la recogida',
    color: 'orange',
  },
  PICKUP_DONE: {
    title: 'Entregado al almacén',
    color: 'violet',
  },
  WAITING_CLEAN_PROCESS: {
    title: 'Esperando limpieza',
    color: 'cyan',
  },
  IN_CLEAN_PROCESS: {
    title: 'En proceso de limpieza',
    color: 'blue',
  },
};
