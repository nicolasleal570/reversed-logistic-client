import { transformPermissionsInformation } from '@components/CreateUser/CreateUserSummary/CreateUserSummary';
import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';
import { useMemo } from 'react';

export function RoleSummary({ role }) {
  const permissions = useMemo(
    () =>
      role.permissions.reduce(
        (acc, curr) => ({ ...acc, [curr.value.toLowerCase()]: true }),
        {}
      ),
    [role]
  );

  console.log(permissions);

  return (
    <div className="w-full lg:w-96">
      <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
        Información sobre el rol
      </h2>

      <DataSection label="Nombre" value={role.name} />
      <DataSection label="Descripción" value={role.description} />

      <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
        Permisos asignados
      </h2>

      <DataSection
        label="Permisos - Módulo de cases"
        tags={transformPermissionsInformation('cases', permissions)}
      />

      <DataSection
        label="Permisos - Módulo de sabores"
        tags={transformPermissionsInformation('flavors', permissions)}
      />

      <DataSection
        label="Permisos - Módulo de órdenes de venta"
        tags={transformPermissionsInformation('orders', permissions)}
      />

      <DataSection
        label="Permisos - Módulo de envíos"
        tags={transformPermissionsInformation('shipments', permissions)}
      />

      <DataSection
        label="Permisos - Módulo de agotamiento"
        tags={transformPermissionsInformation('out_of_stock', permissions)}
      />

      <DataSection
        label="Permisos - Módulo de transporte"
        tags={transformPermissionsInformation('trucks', permissions)}
      />

      <DataSection
        label="Permisos - Módulo de órdenes de limpieza"
        tags={transformPermissionsInformation('clean_process', permissions)}
      />

      <DataSection
        label="Permisos - Módulo de pasos de limpieza"
        tags={transformPermissionsInformation('clean_steps', permissions)}
      />

      <DataSection
        label="Permisos - Módulo de empleados"
        tags={transformPermissionsInformation('users', permissions)}
      />

      <DataSection
        label="Permisos - Módulo de clientes"
        tags={transformPermissionsInformation('customers', permissions)}
      />
    </div>
  );
}
