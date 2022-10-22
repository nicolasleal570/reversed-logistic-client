import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Switch } from '@headlessui/react';
import { parseCookies } from '@utils/parseCookies';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { fetchRole } from '@api/roles/methods';
import { RoleForm } from '@components/RoleForm/RoleForm';
import { RoleSummary } from '@components/RoleSummary/RoleSummary';
import { fetchPermissions } from '@api/permissions/methods';

function EditRolePage({ role: data, permissions, token }) {
  const [isEdit, setIsEdit] = useState(false);
  const [role, setRole] = useState({ ...data });

  useEffect(() => {
    setRole(data);
  }, [data]);

  return (
    <Layout
      title={`Rol: ${role.name}`}
      description="Información detallada del rol"
    >
      {role.value !== 'SUDO' && (
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

      {isEdit ? (
        <RoleForm
          role={role}
          permissions={permissions}
          token={token ?? ''}
          isEdit={isEdit}
          onlyRead={!isEdit}
          onUpdate={(updatedRole) => {
            setRole(updatedRole);
            setIsEdit(false);
          }}
        />
      ) : (
        <RoleSummary role={role} />
      )}
    </Layout>
  );
}

EditRolePage.getInitialProps = async ({ req, query }) => {
  const data = parseCookies(req);

  let role = {};
  let permissions = [];
  if (data.token) {
    try {
      const res = await fetchRole(query.id, data.token);
      const { data: permissionsData } = await fetchPermissions(data.token);

      role = res.data;
      permissions = permissionsData;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    token: data?.token ?? '',
    role: role ?? {},
    permissions: permissions ?? [],
  };
};

export default withProtection(EditRolePage);
