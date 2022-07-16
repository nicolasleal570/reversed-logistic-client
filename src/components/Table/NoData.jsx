import Link from 'next/link';

export function NoData({ href, as, text }) {
  return (
    <section className="w-full h-full flex flex-col flex-wrap p-8 justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        enableBackground="new 0 0 512 512"
        version="1.1"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
        className="fill-current text-gray-500 w-16 h-16 mx-auto"
      >
        <path d="M492 236H276V20c0-11.046-8.954-20-20-20s-20 8.954-20 20v216H20c-11.046 0-20 8.954-20 20s8.954 20 20 20h216v216c0 11.046 8.954 20 20 20s20-8.954 20-20V276h216c11.046 0 20-8.954 20-20s-8.954-20-20-20z" />
      </svg>
      <Link href={href ?? '/'} as={as ?? '/'}>
        <a className="text-center text-lg text-primary-500 mt-3">
          Crear {text}
        </a>
      </Link>
    </section>
  );
}
