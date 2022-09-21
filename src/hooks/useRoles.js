import { useRouter } from 'next/router';
import * as rolesApi from '@api/roles/methods';

export function useRoles() {
  const router = useRouter();

  const createRole = async (data, token) => {
    try {
      const res = await rolesApi.createRole(data, token);

      router.push(`/roles/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRole = async (id, data, token, onFinish) => {
    try {
      await rolesApi.updateRole(id, data, token);

      onFinish && onFinish();
    } catch (error) {
      console.log(error);
    }
  };

  return { createRole, updateRole };
}
