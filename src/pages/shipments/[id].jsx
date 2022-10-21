import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Switch } from '@headlessui/react';
import { fetchShipment } from '@api/shipments/methods';
import { parseCookies } from '@utils/parseCookies';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { ShipmentSummary } from '@components/ShipmentSummary/ShipmentSummary';
import { ShipmentForm } from '@components/ShipmentForm/ShipmentForm';
import { fetchTrucks } from '@api/trucks/methods';
import { useShipments } from '@hooks/useShipments';

function EditShipmentPage({ shipment: data, trucks, token }) {
  const [shipment, setShipment] = useState(data);
  const [isEdit, setIsEdit] = useState(false);
  const { startShipment, deliverShipment } = useShipments();

  useEffect(() => {
    setShipment(data);
  }, [data]);

  return (
    <Layout
      title={`Envío - ${shipment.trackNumber.toUpperCase()}`}
      description={`Información detallada del envío`}
    >
      {shipment.status.value === 'WAITING_SHIPMENT' && (
        <div className="mb-8 border-b border-gray-200 pb-8">
          <Switch.Group>
            <>
              <Switch.Label className="mr-4">Habilitar edición</Switch.Label>
              <Switch
                checked={isEdit}
                onChange={setIsEdit}
                className={classNames(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                  {
                    'bg-indigo-600': isEdit,
                    'bg-gray-200': !isEdit,
                  }
                )}
              >
                <span
                  className={classNames(
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    {
                      'translate-x-6': isEdit,
                      'translate-x-1': !isEdit,
                    }
                  )}
                />
              </Switch>
            </>
          </Switch.Group>
        </div>
      )}

      {shipment.status.value === 'WAITING_SHIPMENT' &&
        shipment.orders.length > 0 && (
          <div className="mb-8 border-b border-gray-200 pb-8">
            <button
              type="button"
              className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
              onClick={async () => {
                const { data: updatedData } = await startShipment({
                  id: shipment.id,
                });
                setShipment(updatedData);
              }}
            >
              <span>Enviar</span>
            </button>
          </div>
        )}

      {shipment.status.value === 'IN_SHIPMENT' && shipment.shipmentAt && (
        <div className="mb-8 border-b border-gray-200 pb-8">
          <button
            type="button"
            className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
            onClick={async () => {
              const { data: updatedData } = await deliverShipment(shipment.id);
              setShipment(updatedData);
            }}
          >
            <span>Entregar</span>
          </button>
        </div>
      )}

      {isEdit ? (
        <ShipmentForm
          shipment={shipment}
          token={token ?? ''}
          isEdit={isEdit}
          onlyRead={!isEdit}
          trucks={trucks}
          onUpdate={(updatedShipment) => {
            setShipment(updatedShipment);
            setIsEdit(false);
          }}
        />
      ) : (
        <ShipmentSummary shipment={shipment} />
      )}
    </Layout>
  );
}

EditShipmentPage.getInitialProps = async ({ req, query }) => {
  const data = parseCookies(req);

  let shipment = {};
  let trucks = [];
  if (data.token) {
    try {
      const res = await fetchShipment(query.id, data.token);
      const { data: trucksData } = await fetchTrucks(data.token);

      shipment = res.data;
      trucks = trucksData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    token: data?.token ?? '',
    shipment: shipment ?? {},
    trucks: trucks ?? [],
  };
};

export default withProtection(EditShipmentPage);
