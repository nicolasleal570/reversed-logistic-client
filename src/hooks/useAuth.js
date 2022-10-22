import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import {
  changePassword,
  logoutUser,
  recoveryPassword,
} from '@api/auth/methods';
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

  const handleRecoveryPassword = async (data) => {
    const { token } = cookies;
    try {
      return asyncNotify(recoveryPassword(data, token), {
        pending: 'Valindando información...',
        success:
          'Se envió un correo al usuario para que reinicie su contraseña.',
        error: 'Tuvimos problemas validando la información. Intenta de nuevo.',
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleChangePassword = async (data) => {
    const { token } = cookies;
    try {
      return asyncNotify(changePassword(data, token), {
        pending: 'Valindando información...',
        success: 'Se cambió la contraseña correctamente. Inicia sesión.',
        error: 'Tuvimos problemas validando la información. Intenta de nuevo.',
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    handleLogout,
    handleRecoveryPassword,
    handleChangePassword,
  };
}
