import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { logoutUser } from '@api/auth/methods';
import { useNotify } from './useNotify';

export function useAuth() {
  const router = useRouter();
  const { asyncNotify } = useNotify();
  const [cookies, _, removeCookie] = useCookies(['token']);

  const handleLogout = async () => {
    const { token } = cookies;
    try {
      await asyncNotify(logoutUser(token), {
        pending: 'Valindando sesión...',
        success: 'Cerraste sesión correctamente',
        error: 'Tuvimos problemas validando la sesión. Intenta de nuevo.',
      });

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
