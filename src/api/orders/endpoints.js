export const ORDERS_URL = '/orders';
export const ORDER_URL = (orderId) => `/orders/${orderId}`;
export const TAKE_ORDER_URL = `${ORDERS_URL}/take`;
export const DONE_ORDER_URL = `${ORDERS_URL}/done`;
