import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/outline';

export function NoData({ href, as, text }) {
  return (
    <section className="w-full h-full flex flex-col flex-wrap py-16 justify-center">
      <Link href={href ?? '/'} as={as ?? '/'}>
        <a className="text-center text-lg text-primary-500 mt-3">
          <PlusIcon className="w-12 text-gray-500 mx-auto" />
          Crear {text}
        </a>
      </Link>
    </section>
  );
}
