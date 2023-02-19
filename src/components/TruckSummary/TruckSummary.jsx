import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';
import { ShipmentsTable } from '@components/ShipmentsTable/ShipmentsTable';

export function TruckSummary({ truck }) {
  return (
    <>
      <div className="w-full">
        <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
          Información sobre el vehículo
        </h2>
        <DataSection label="Marca" value={truck.brand} />
        <DataSection label="Modelo" value={truck.model} />
        <DataSection label="Tipo" value={truck.type} />
        <DataSection label="Placa" value={truck.licensePlate} />
        <DataSection
          label="Conductor"
          value={truck.driver?.fullName || '-'}
          url={truck?.driver ? `/users/${truck?.driver?.id}` : undefined}
        />
      </div>
      {truck?.shipments?.length > 0 ? (
        <>
          <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
            Histórico de envíos
          </h2>

          <ShipmentsTable
            shipments={truck?.shipments || []}
            onlyTable
            deactivateSearchBar
          />
        </>
      ) : null}
    </>
  );
}
