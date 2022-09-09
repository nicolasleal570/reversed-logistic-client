export const productsModuleFields = (name, permissions = []) => {
  const arr = permissions
    .filter((permission) => permission.value.toLowerCase().includes(name))
    .map((permission) => ({
      name: permission.value.toLowerCase(),
      title: permission.name,
      description: permission.description,
    }));

  return arr;
};

export const listOfModules = (permissions) => [
  {
    title: 'Módulo de cases',
    description: 'Permisos que afectan al módulo de cases',
    fields: productsModuleFields('cases', permissions),
  },
  {
    title: 'Módulo de sabores',
    description: 'Permisos que afectan al módulo de sabores',
    fields: productsModuleFields('flavors', permissions),
  },
  {
    title: 'Módulo de órdenes',
    description: 'Permisos que afectan al módulo de órdenes',
    fields: productsModuleFields('orders', permissions),
  },
  {
    title: 'Módulo de envíos',
    description: 'Permisos que afectan al módulo de envíos',
    fields: productsModuleFields('shipments', permissions),
  },
  {
    title: 'Módulo de transportes',
    description: 'Permisos que afectan al módulo de transportes',
    fields: productsModuleFields('trucks', permissions),
  },
  {
    title: 'Módulo de órdenes de limpieza',
    description: 'Permisos que afectan al módulo de órdenes de limpieza',
    fields: productsModuleFields('clean_process', permissions),
  },
  {
    title: 'Módulo de pasos de limpieza',
    description: 'Permisos que afectan al módulo de pasos de limpieza',
    fields: productsModuleFields('clean_steps', permissions),
  },
  {
    title: 'Módulo de empleados',
    description: 'Permisos que afectan al módulo de empleados',
    fields: productsModuleFields('users', permissions),
  },
  {
    title: 'Módulo de clientes y sucursales',
    description: 'Permisos que afectan al módulo de clientes y sucursales',
    fields: productsModuleFields('customers', permissions),
  },
];
