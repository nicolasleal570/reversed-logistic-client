export const ORDERS_URL = '/orders';
export const ORDER_URL = (orderId) => `/orders/${orderId}`;
export const ORDER_STATUS = '/order-status';
export const TAKE_ORDER_URL = `${ORDERS_URL}/take`;
export const DONE_ORDER_URL = `${ORDERS_URL}/done`;
export const ASSIGN_SHIPMENT_ORDER_URL = `${ORDERS_URL}/assign-shipment`;
