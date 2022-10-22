import { useState } from 'react';
import { useUser } from '@hooks/useUser';
import { useAuth } from '@hooks/useAuth';

export function ChangePasswordButton({ user }) {
  const { user: authUser } = useUser();
  const { handleRecoveryPassword } = useAuth();
  const [isMailSend, setIsMailSend] = useState(false);

  if (!authUser?.isSudo) {
    return null;
  }

  return (
    <div className="mb-8 border-b border-gray-200 pb-8">
      {isMailSend ? (
        <p>{`Se envió un correo a "${user.email}" para reiniciar su contraseña`}</p>
      ) : (
        <button
          type="button"
          className="border border-indigo-600 text-indigo-600 flex items-center px-4 py-3 rounded-lg text-sm mr-2"
          onClick={async () => {
            await handleRecoveryPassword({ email: user.email });
            setIsMailSend(true);
          }}
        >
          <span>Cambiar contraseña</span>
        </button>
      )}
    </div>
  );
}
