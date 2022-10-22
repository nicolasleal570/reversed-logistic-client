import {
  ShoppingCartIcon,
  TruckIcon,
  UserIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';
import { withProtection } from '@components/withProtection';
import { Layout } from '@components/Layout/Layout';
import { DashboardInfoCard } from '@components/DashboardInfoCard/DashboardInfoCard';

function HomePage() {
  return (
    <Layout
      title="¡Bienvenidos!"
      description="Esperamos que vayas progresando con tu proyecto. A continuación te
        brindamos algunos accesos rápidos hacia los diferentes módulos de nuestra
        plataforma para que puedas empezar a gestionar la logística inversa de
        tu empresa."
    >
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
        description="Gestiona los productos de tu empresa y su procesamiento al ser utilizados y devueltos. Para poder gestionar la logística inversa de tu empresa, debes registrar los pedidos que tengas"
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
        route="/config"
        firstColor="bg-orange-100"
        secondColor="bg-orange-600"
      />
    </Layout>
  );
}

export default withProtection(HomePage);
