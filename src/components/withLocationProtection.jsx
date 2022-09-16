import Router from 'next/router';
import { useEffect } from 'react';
import { parseCookies } from '@utils/parseCookies';
import { fetchCurrentUser } from '@api/auth/methods';
import { useUser } from '@hooks/useUser';

const redirectUrl = '/login?redirected=true';

export function withLocationProtection(WrappedComponent) {
  const componentName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component';

  const Component = ({ user: authUser, location, ...props }) => {
    const { setUser } = useUser();

    useEffect(() => {
      setUser(authUser?.user ?? location?.location ?? null);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authUser]);

    return (
      <WrappedComponent user={authUser?.user} location={location} {...props} />
    );
  };

  Component.getInitialProps = async ({ req, res, ...context }) => {
    const data = parseCookies(req);

    let location = undefined;

    if (data.token) {
      try {
        const res = await fetchCurrentUser(data.token);
        location = res.data;
      } catch (error) {
        console.log('Failed user fetch into getInitialProps', { error });
      }
    }

    if (!location) {
      if (res) {
        res.writeHead(302, {
          Location: redirectUrl,
        });
        res.end();
      } else {
        Router.replace(redirectUrl);
      }
    } else if (Object.keys(location?.user ?? {}).length > 0) {
      if (res) {
        res.writeHead(302, {
          Location: '/',
        });
        res.end();
      } else {
        Router.replace('/');
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({
        ...context,
        req,
        res,
        location,
      });

      return { ...wrappedProps, location };
    }

    return {
      location,
    };
  };

  Component.displayName = `withuser(${componentName})`;

  return Component;
}
