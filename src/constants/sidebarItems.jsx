import {
  BellIcon,
  BeakerIcon,
  ChartBarIcon,
  CollectionIcon,
  PlusSmIcon,
  TruckIcon,
  DatabaseIcon,
  UserGroupIcon,
  UsersIcon,
  CashIcon,
  ClipboardCheckIcon,
} from '@heroicons/react/outline';
import Router from 'next/router';

const iconStyles = 'w-5 h-5 mr-3 text-gray-500';

export const items = [
  {
    slots: [
      {
        title: 'Notificaciones',
        icon: <BellIcon className={iconStyles} />,
        url: '/notifications',
      },
    ],
  },
  {
    header: 'Analíticas',
    slots: [
      {
        title: 'Ventas',
        icon: <ChartBarIcon className={iconStyles} />,
        url: '/sells',
      },
    ],
  },
  {
    header: 'Cases',
    headerAction: () => Router.push('/cases/create'),
    headerActionIcon: <PlusSmIcon className="w-5 h-5" />,
    slots: [
      {
        title: 'Cases',
        icon: <DatabaseIcon className={iconStyles} />,
        url: '/cases',
      },
      {
        title: 'Sabores',
        icon: <CollectionIcon className={iconStyles} />,
        url: '/flavors',
      },
    ],
  },
  {
    header: 'Órdenes',
    headerAction: () => Router.push('/orders/create'),
    headerActionIcon: <PlusSmIcon className="w-5 h-5" />,
    slots: [
      {
        title: 'Órdenes',
        icon: <CashIcon className={iconStyles} />,
        url: '/orders',
      },
      {
        title: 'Envíos',
        icon: <ClipboardCheckIcon className={iconStyles} />,
        url: '/shipments',
      },
      {
        title: 'Transporte',
        icon: <TruckIcon className={iconStyles} />,
        url: '/trucks',
      },
    ],
  },
  {
    header: 'Limpieza para los cases',
    headerAction: () => Router.push('/clean-process/create'),
    headerActionIcon: <PlusSmIcon className="w-5 h-5" />,
    slots: [
      {
        title: 'Órdenes de limpieza',
        icon: <DatabaseIcon className={iconStyles} />,
        url: '/clean-process',
      },
      {
        title: 'Pasos de limpieza',
        icon: <BeakerIcon className={iconStyles} />,
        url: '/clean-process/steps',
      },
    ],
  },
  {
    header: 'Usuarios',
    headerAction: () => Router.push('/users/create'),
    headerActionIcon: <PlusSmIcon className="w-5 h-5" />,
    slots: [
      {
        title: 'Empleados',
        icon: <UsersIcon className={iconStyles} />,
        url: '/users',
      },
      {
        title: 'Clientes',
        icon: <UserGroupIcon className={iconStyles} />,
        url: '/customers',
      },
    ],
  },
];
