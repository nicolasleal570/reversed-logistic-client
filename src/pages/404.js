import {
  ShoppingCartIcon,
  TruckIcon,
  UserIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';
import { DashboardInfoCard } from '@components/DashboardInfoCard/DashboardInfoCard';

function NotFoundPage() {
  return (
    <div className="border-8 border-indigo-500 h-screen flex items-center justify-center flex-col">
      <h1 className="text-5xl font-bold text-center text-gray-900">
        ¡Vaya! Creo te perdiste.
      </h1>
      <p className="text-sm md:text-base leading-6 font-normal text-center text-gray-500 w-full md:w-5/12 mt-3 mb-8">
        A continuación tienes unos links para orientarte mejor en el camino.
        Puede ser que la página que intentabas visitar está en construcción o no
        existe.
      </p>
      <DashboardInfoCard
        title="Cases"
        description="Gestiona los cases de tu empresa y su procesamiento al ser utilizados y devueltos."
        icon={<ShoppingCartIcon className="w-5 h-5" />}
        route="/cases"
        firstColor="bg-green-100"
        secondColor="bg-green-600"
      />

      <DashboardInfoCard
        title="Órdenes"
        description="Gestiona los productos de tu empresa y su procesamiento al ser utilizados y devueltos.Para poder gestionar la logística inversa de tu empresa, debes registrar los pedidos que tengas"
        icon={<TruckIcon className="w-5 h-5" />}
        route="/orders"
        firstColor="bg-blue-100"
        secondColor="bg-blue-600"
      />

      <DashboardInfoCard
        title="Usuarios"
        description="Desde nuestra plataforma puedes gestionar tus empleados. Además puedes controlar sus roles y permisos."
        icon={<UserIcon className="w-5 h-5" />}
        route="/users"
        firstColor="bg-purple-100"
        secondColor="bg-purple-600"
      />

      <DashboardInfoCard
        title="Clientes"
        description="Desde nuestra plataforma puedes ver tus clientes y sus sucursales."
        icon={<UserGroupIcon className="w-5 h-5" />}
        route="/customers"
        firstColor="bg-orange-100"
        secondColor="bg-orange-600"
      />
    </div>
  );
}

export default NotFoundPage;
