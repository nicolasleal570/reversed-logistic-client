export const CUSTOMERS_URL = '/customers';
export const CUSTOMERS_LOCATIONS_URL = '/customers/locations';
export const CUSTOMER_URL = (customerId) => `/customers/${customerId}`;
export const CUSTOMERS_LOCATION_BY_CUSTOMER_ID_URL = (customerId) =>
  `/customer-locations/customer/${customerId}`;
