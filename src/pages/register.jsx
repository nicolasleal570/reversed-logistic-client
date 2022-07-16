import Link from 'next/link';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { InputLabel } from '@components/InputLabel/InputLabel';
import { InputField } from '@components/InputField/InputField';
import { FormRow } from '@components/FormRow/FormRow';

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log({ data });

  return (
    <main className="w-full bg-red-400 flex justify-between">
      <section className="flex items-center flex-col flex-1 pt-20 px-8 md:px-24  lg:px-48 lg:max-w-[722px] lg:pt-40 h-screen bg-white">
        <h1 className="text-3xl leading-9 font-medium text-center text-gray-900">
          Regístrate
        </h1>
        <p className="text-sm md:text-base leading-6 font-normal text-center text-gray-500 lg:w-80 my-3">
          Si aún no tienes una cuenta, rellena el formulario y crea una nueva
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <FormRow>
            <InputLabel title="Nombre completo" inputId="name" />
            <InputField
              type="text"
              placeholder="John Doe"
              name="name"
              id="name"
              inputProps={{
                ...register('name', { required: 'Debes ingresar tu nombre' }),
              }}
              errors={errors}
            />
          </FormRow>

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
              highlight="La contraseña debe tener mínimo 8 caracteres"
              inputProps={{
                ...register('password', {
                  required: 'Debes ingresar una contraseña',
                  minLength: {
                    value: 8,
                    message:
                      'Tu contraseña debe tener un mínimo de 8 carácteres',
                  },
                }),
              }}
              errors={errors}
            />
          </FormRow>

          <Button type="submit">Crear cuenta</Button>

          <p className="mt-5 text-sm leading-5 font-normal text-center text-gray-500">
            Ya tienes una cuenta?{' '}
            <Link href="login">
              <a className="text-indigo-600 font-medium">Inicia sesión!</a>
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
