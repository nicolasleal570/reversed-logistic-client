import { useRouter } from 'next/router';
import * as usersApi from '@api/users/methods';
import { useNotify } from './useNotify';

const { createUser: createUserAPI, updateUser: updateUserAPI } = usersApi;

export function useUsers() {
  const router = useRouter();
  const { asyncNotify } = useNotify();

  const createUser = async (data, token) => {
    try {
      const res = await asyncNotify(createUserAPI(data, token), {
        pending: 'Creando un nuevo empleado...',
        success: 'Se creó un nuevo empleado correctamente',
        error: 'Tuvimos problemas al crear el empleado. Intenta de nuevo.',
      });

      router.push(`/users/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (id, data, token) => {
    try {
      return asyncNotify(updateUserAPI(id, data, token), {
        pending: 'Actualizando el empleado...',
        success: 'Se actualizó el empleado correctamente',
        error: 'Tuvimos problemas al actualizar el empleado. Intenta de nuevo.',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { createUser, updateUser };
}
