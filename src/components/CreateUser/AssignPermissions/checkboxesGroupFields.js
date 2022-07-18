export const productsModuleFields = (name) => [
  {
    name: `${name}_read`,
    title: 'Leer',
    description:
      'Puede leer información de recursos del módulo correspondiente',
  },
  {
    name: `${name}_create`,
    title: 'Crear',
    description: 'Puede crear nuevos recursos en el módulo correspondiente',
  },
  {
    name: `${name}_update`,
    title: 'Actualizar',
    description: 'Puede actualizar recursos en el módulo correspondiente',
  },
  {
    name: `${name}_delete`,
    title: 'Eliminar',
    description: 'Puede eliminar recursos del módulo correspondiente',
  },
];

export const listOfModules = [
  {
    title: 'Módulo de productos',
    description: 'Permisos que afectan al módulo de productos',
    fields: productsModuleFields('products'),
  },
  {
    title: 'Módulo de sabores',
    description: 'Permisos que afectan al módulo de sabores',
    fields: productsModuleFields('flavors'),
  },
  {
    title: 'Módulo de limpieza',
    description: 'Permisos que afectan al módulo de limpieza',
    fields: productsModuleFields('process'),
  },
  {
    title: 'Módulo de órdenes',
    description: 'Permisos que afectan al módulo de órdenes',
    fields: productsModuleFields('orders'),
  },
  {
    title: 'Módulo de envíos',
    description: 'Permisos que afectan al módulo de envíos',
    fields: productsModuleFields('shipments'),
  },
  {
    title: 'Módulo de transporte',
    description: 'Permisos que afectan al módulo de transporte',
    fields: productsModuleFields('trucks'),
  },
  {
    title: 'Módulo de empleados',
    description: 'Permisos que afectan al módulo de empleados',
    fields: productsModuleFields('users'),
  },
  {
    title: 'Módulo de clientes',
    description: 'Permisos que afectan al módulo de clientes',
    fields: productsModuleFields('customers'),
  },
];
