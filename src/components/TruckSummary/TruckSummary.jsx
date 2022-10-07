import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';

export function TruckSummary({ truck }) {
  return (
    <div className="w-full lg:w-96">
      <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
        Información sobre el vehículo
      </h2>

      <DataSection label="Marca" value={truck.brand} />
      <DataSection label="Modelo" value={truck.model} />
      <DataSection label="Tipo" value={truck.type} />
      <DataSection label="Placa" value={truck.licensePlate} />
      <DataSection label="Conductor" value={truck.driver?.fullName || '-'} />
    </div>
  );
}
