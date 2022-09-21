import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { logoutUser } from '@api/auth/methods';

export function useAuth() {
  const router = useRouter();
  const [cookies, _, removeCookie] = useCookies(['token']);

  const handleLogout = async () => {
    const { token } = cookies;
    try {
      await logoutUser(token);
      removeCookie('token');
      router.replace('/login');
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    handleLogout,
  };
}
