import { useCreateUserForm } from '@hooks/useCreateUserForm';
import { Button, SM_SIZE } from '@components/Button/Button';
import { DataSection } from './DataSection';

export const transformPermissionsInformation = (key, permissions) => {
  const translation = {
    read: 'Leer',
    create: 'Crear',
    update: 'Actualizar',
    delete: 'Eliminar',
  };
  const keys = Object.entries(permissions)
    .filter(({ 1: value }) => Boolean(value))
    .filter(({ 0: objectKey }) => objectKey.startsWith(key));

  return keys.map(({ 0: objectKey }) => {
    const arr = objectKey.split('_');

    return translation[arr[arr.length - 1]];
  });
};

export function CreateUserSummary({ onChangeStep, currentStep, roles }) {
  const {
    personalInformation,
    roleInformation,
    permissionsInformation,
    onCreateUser,
  } = useCreateUserForm();

  const role =
    roles.find(
      (item) => item.id === Number.parseInt(roleInformation.role, 10)
    ) ?? {};

  return (
    <div className="">
      <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
        Informacion personal
      </h2>

      <DataSection
        label="Nombre y apellido"
        value={personalInformation.fullName}
      />
      <DataSection
        label="Correo electrónico"
        value={personalInformation.email}
      />

      <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
        Rol asignado
      </h2>

      <DataSection label="Rol" value={role.name} />

      <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
        Permisos asignados
      </h2>

      <DataSection
        label="Permisos - Módulo de cases"
        tags={transformPermissionsInformation('cases', permissionsInformation)}
      />

      <DataSection
        label="Permisos - Módulo de sabores"
        tags={transformPermissionsInformation(
          'flavors',
          permissionsInformation
        )}
      />

      <DataSection
        label="Permisos - Módulo de órdenes de venta"
        tags={transformPermissionsInformation('orders', permissionsInformation)}
      />

      <DataSection
        label="Permisos - Módulo de envíos"
        tags={transformPermissionsInformation(
          'shipments',
          permissionsInformation
        )}
      />

      <DataSection
        label="Permisos - Módulo de transporte"
        tags={transformPermissionsInformation('trucks', permissionsInformation)}
      />

      <DataSection
        label="Permisos - Módulo de órdenes de limpieza"
        tags={transformPermissionsInformation(
          'clean_process',
          permissionsInformation
        )}
      />

      <DataSection
        label="Permisos - Módulo de pasos de limpieza"
        tags={transformPermissionsInformation(
          'clean_steps',
          permissionsInformation
        )}
      />

      <DataSection
        label="Permisos - Módulo de empleados"
        tags={transformPermissionsInformation('users', permissionsInformation)}
      />

      <DataSection
        label="Permisos - Módulo de clientes"
        tags={transformPermissionsInformation(
          'customers',
          permissionsInformation
        )}
      />

      <div className="grid grid-cols-2 gap-3 ml-auto w-9/12 lg:w-3/12 mt-8">
        <Button
          type="button"
          size={SM_SIZE}
          outline
          onClick={() => onChangeStep(currentStep - 1)}
        >
          Volver
        </Button>
        <Button type="button" size={SM_SIZE} onClick={onCreateUser}>
          Crear usuario
        </Button>
      </div>
    </div>
  );
}
