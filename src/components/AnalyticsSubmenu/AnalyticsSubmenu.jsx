import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

const list = [
  { label: 'Cases', url: '/analytics/cases' },
  { label: 'Sabores', url: '/analytics/flavors' },
  { label: 'Ventas', url: '/analytics/orders' },
  { label: 'Clientes', url: '/analytics/customers' },
  { label: 'Envíos', url: '/analytics/shipments' },
  { label: 'Agotamiento', url: '/analytics/out-of-stock-orders' },
  { label: 'Transporte', url: '/analytics/trucks' },
  { label: 'Órdenes de Limpieza', url: '/analytics/clean-process' },
  { label: 'Pasos de Limpieza', url: '/analytics/clean-steps' },
  { label: 'Usuarios', url: '/analytics/users' },
];

export function AnalyticsSubmenu() {
  const router = useRouter();

  return (
    <ul className="inline-flex items-center flex-wrap divide-x divide-gray-200 border border-gray-200 lg:rounded">
      {list.map((item, idx) => {
        const isActive = router.pathname.includes(item.url);
        const isLast = idx === list.length - 1;
        const isFirst = idx === 0;

        return (
          <li
            className={classNames('w-full lg:w-auto', {
              'lg:rounded-l': isFirst,
              'lg:rounded-r lg:rounded-b-0': isLast,
              'bg-indigo-500 text-white': isActive,
              'bg-white text-gray-800': !isActive,
            })}
            key={item.url}
          >
            <Link href={item.url} replace>
              <a className="block px-3 py-2.5 w-full">{item.label}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
