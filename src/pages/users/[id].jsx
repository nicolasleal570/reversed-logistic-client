import { useState } from 'react';
import classNames from 'classnames';
import { Switch } from '@headlessui/react';
import { parseCookies } from '@utils/parseCookies';
import { Layout } from '@components/Layout/Layout';
import { withProtection } from '@components/withProtection';
import { fetchUser } from '@api/users/methods';
import { UserSummary } from '@components/UserSummary/UserSummary';

function UserPage({ userInfo }) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Layout
      title={userInfo.fullName}
      description="Información detallada del usuario"
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

      <UserSummary user={userInfo} />
    </Layout>
  );
}

UserPage.getInitialProps = async ({ req, query }) => {
  const data = parseCookies(req);

  let user = {};
  if (data.token) {
    try {
      const res = await fetchUser(query.id, data.token);

      user = res.data;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    token: data?.token ?? '',
    userInfo: user ?? {},
  };
};

export default withProtection(UserPage);
