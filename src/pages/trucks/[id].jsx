import { useState } from 'react';
import classNames from 'classnames';
import { Switch } from '@headlessui/react';
import { parseCookies } from '@utils/parseCookies';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { TruckForm } from '@components/TruckForm/TruckForm';
import { TruckSummary } from '@components/TruckSummary/TruckSummary';
import { fetchTruck } from '@api/trucks/methods';
import { fetchUsers } from '@api/users/methods';

function EditTruckPage({ truck, employees, token }) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Layout
      title={`Transporte: ${truck.brand} - ${truck.model}`}
      description="Información detallada del vehículo"
    >
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

      {isEdit ? (
        <TruckForm
          truck={truck}
          employees={employees}
          token={token ?? ''}
          isEdit={isEdit}
          onlyRead={!isEdit}
        />
      ) : (
        <TruckSummary truck={truck} />
      )}
    </Layout>
  );
}

EditTruckPage.getInitialProps = async ({ req, query }) => {
  const data = parseCookies(req);

  let truck = {};
  let employees = [];
  if (data.token) {
    try {
      const res = await fetchTruck(query.id, data.token);
      const { data: employeesData } = await fetchUsers(data.token);

      truck = res.data;
      employees = employeesData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    token: data?.token ?? '',
    truck: truck ?? {},
    employees: employees ?? [],
  };
};

export default withProtection(EditTruckPage);
