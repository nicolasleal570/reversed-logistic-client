import { useRouter } from 'next/router';
import * as usersApi from '@api/users/methods';

const { createUser: createUserAPI, updateUser: updateUserAPI } = usersApi;

export function useUsers() {
  const router = useRouter();

  const createUser = async (data, token) => {
    try {
      const res = await createUserAPI(data, token);

      router.push(`/users/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (id, data, token, onFinish) => {
    try {
      await updateUserAPI(id, data, token);

      onFinish && onFinish();
    } catch (error) {
      console.log(error);
    }
  };

  return { createUser, updateUser };
}
