import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { InputField } from '@components/InputField/InputField';
import { FormRow } from '@components/FormRow/FormRow';
import { fetchLogin } from '@api/methods';

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [cookie, setCookie] = useCookies(['token']);

  const onSubmit = async (data) => {
    try {
      const res = await fetchLogin(data);

      setCookie('token', res.data.token, {
        path: '/',
        maxAge: 3600,
        sameSite: true,
      });
      router.push('/');
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <main className="w-full bg-red-400 flex justify-between">
      <section className="flex items-center flex-col flex-1 pt-20 px-8 md:px-24  lg:px-48 lg:max-w-[722px] lg:pt-40 h-screen bg-white">
        <h1 className="text-3xl leading-9 font-medium text-center text-gray-900">
          Bienvenido!
        </h1>
        <p className="text-sm md:text-base leading-6 font-normal text-center text-gray-500 lg:w-80 my-3">
          Bienvenido de vuelta, rellena el formulario y entra en tu cuenta.
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

          <Link href="/forgot-password">
            <a className="block w-full text-sm leading-5 font-medium text-right text-indigo-700 mb-5">
              Olvidaste tu contraseña?
            </a>
          </Link>

          <Button type="submit">Crear cuenta</Button>

          <p className="mt-5 text-sm leading-5 font-normal text-center text-gray-500">
            Aún no eres miembro?{' '}
            <Link href="register">
              <a className="text-indigo-600 font-medium">Regístrate!</a>
            </Link>
          </p>
        </form>
      </section>

      <section
        className="hidden md:block flex-1 bg-contain bg-center bg-no-repeat"
        style={{ background: "url('/dragon-scales.svg')" }}
      />
    </main>
  );
}

export const DEFAULT_KIND = 'default';
export const DEFAULT_SM_KIND = 'default_sm';

const validKindOfBtn = new Set([DEFAULT_KIND, DEFAULT_SM_KIND]);

export const NORMAL_SIZE = 'normal';
export const SM_SIZE = 'small';

const validSizeOfBtn = new Set([NORMAL_SIZE, SM_SIZE]);

export function Button({
  children,
  kind = DEFAULT_KIND,
  size = NORMAL_SIZE,
  fullWidth = true,
  className,
  ...props
}) {
  const validKind = validKindOfBtn.has(kind) ? kind : DEFAULT_KIND;
  const validSize = validSizeOfBtn.has(size) ? size : NORMAL_SIZE;

  return (
    <button
      type="submit"
      className={classNames(
        {
          'w-full': fullWidth,
          'bg-indigo-600 text-sm leading-5 font-medium text-white rounded-lg':
            validKind === DEFAULT_KIND,
          'py-4 px-8': validSize === NORMAL_SIZE,
          'py-2 px-4 text-xs': validSize === SM_SIZE,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
