import { useRouter } from 'next/router';
import * as rolesApi from '@api/roles/methods';
import { useNotify } from './useNotify';

export function useRoles() {
  const router = useRouter();
  const { asyncNotify } = useNotify();

  const createRole = async (data, token) => {
    try {
      const res = await asyncNotify(rolesApi.createRole(data, token), {
        pending: 'Creando un nuevo rol...',
        success: 'Rol creado correctamente',
        error: 'Tuvimos problemas para crear el rol. Intenta de nuevo.',
      });

      router.push(`/roles/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRole = async (id, data, token) => {
    try {
      return asyncNotify(rolesApi.updateRole(id, data, token), {
        pending: 'Actualizando el rol...',
        success: 'Se actualizó el rol correctamente',
        error: 'Tuvimos problemas para actualizar el rol. Intenta de nuevo.',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { createRole, updateRole };
}
