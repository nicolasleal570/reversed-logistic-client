import { useEffect } from 'react';
import { parseCookies } from '@utils/parseCookies';
import { fetchCurrentUser } from '@api/methods';
import { useUser } from '@hooks/useUser';

export function withUser(WrappedComponent) {
  const componentName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component';

  const Component = ({ user: authUser, ...props }) => {
    const { setUser } = useUser();

    useEffect(() => {
      setUser(authUser?.user ?? null);
    }, [authUser]);

    return <WrappedComponent user={authUser?.user ?? null} {...props} />;
  };

  Component.getInitialProps = async ({ req, res }) => {
    const data = parseCookies(req);

    let user = undefined;

    if (data.token) {
      try {
        const res = await fetchCurrentUser(data.token);
        user = res.data;
      } catch (error) {
        console.log('Failed user fetch into getInitialProps', { error });
      }
    }

    if (res) {
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        res.writeHead(301, { Location: '/' });
        res.end();
      }
    }

    return {
      user,
    };
  };

  Component.displayName = `withuser(${componentName})`;

  return Component;
}
