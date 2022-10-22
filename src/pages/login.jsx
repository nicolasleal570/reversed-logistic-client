import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { InputField } from '@components/InputField/InputField';
import { FormRow } from '@components/FormRow/FormRow';
import { fetchLogin } from '@api/auth/methods';
import { Button } from '@components/Button/Button';
import { useEffect, useState } from 'react';
import { useNotify } from '@hooks/useNotify';

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();
  const { asyncNotify } = useNotify();
  const [isLoading, setIsLoading] = useState(false);
  const [, setCookie, removeCookie] = useCookies(['token']);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const { data: info } = await asyncNotify(fetchLogin(data), {
        pending: 'Valindando los datos...',
        success: '¡Bienvenido de vuelta!',
        error: 'Revisa los datos ingresados.',
      });

      setCookie('token', info.token, {
        path: '/',
        //maxAge: 3600,
        sameSite: true,
      });

      if (info.isLocation) {
        router.push('/out-of-stock');
        return;
      }

      router.push(router.query.from || '/home');
    } catch (error) {
      setIsLoading(false);
      setValue('password', '');
      setError('email', { shouldFocus: true });
      setError('password', { shouldFocus: false });
    }
  };

  useEffect(() => {
    if (Boolean(router.query.redirected)) {
      removeCookie('token');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <main className="w-full bg-red-400 flex justify-between">
      <section className="flex items-center flex-col flex-1 pt-20 px-8 md:px-24  lg:px-48 lg:max-w-[722px] lg:pt-40 h-screen bg-white">
        <h1 className="text-3xl leading-9 font-medium text-center text-gray-900">
          ¡Bienvenido!
        </h1>
        <p className="text-sm md:text-base leading-6 font-normal text-center text-gray-500 lg:w-80 my-3">
          Rellena el formulario y entra en tu cuenta.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <FormRow>
            <InputLabel title="Correo Electrónico" inputId="email" />
            <InputField
              type="email"
              placeholder="john@email.com"
              name="email"
              id="email"
              inputProps={{
                ...register('email', { required: 'Debes ingresar un correo' }),
              }}
              errors={errors}
            />
          </FormRow>

          <FormRow>
            <InputLabel title="Contraseña" inputId="password" />
            <InputField
              type="password"
              name="password"
              placeholder="********"
              inputProps={{
                ...register('password', {
                  required: 'Debes ingresar una contraseña',
                }),
              }}
              errors={errors}
            />
          </FormRow>

          <div className="mt-8">
            <Button type="submit" disabled={isLoading}>
              Iniciar sesión
            </Button>
          </div>
        </form>
      </section>

      <section
        className="hidden md:block flex-1 bg-contain bg-center bg-no-repeat"
        style={{ background: "url('/dragon-scales.svg')" }}
      />
    </main>
  );
}
