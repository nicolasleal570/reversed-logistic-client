import Router from 'next/router';
import { useEffect } from 'react';
import { parseCookies } from '@utils/parseCookies';
import { fetchCurrentUser } from '@api/auth/methods';
import { useUser } from '@hooks/useUser';

const redirectUrl = (from) => `/login?redirected=true&from=${from || '/home'}`;

export function withProtection(WrappedComponent) {
  const componentName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component';

  const Component = ({ user: authUser, ...props }) => {
    const { setUser } = useUser();

    useEffect(() => {
      setUser(authUser?.user ?? null);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authUser]);

    return <WrappedComponent user={authUser.user} {...props} />;
  };

  Component.getInitialProps = async ({ req, res, ...context }) => {
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

    if (!user) {
      if (res) {
        res.writeHead(302, {
          Location: redirectUrl(context.pathname),
        });
        res.end();
      } else {
        Router.replace(redirectUrl(context.pathname));
      }
    } else if (Object.keys(user?.location ?? {}).length > 0) {
      if (res) {
        res.writeHead(302, {
          Location: '/out-of-stock',
        });
        res.end();
      } else {
        Router.replace('/out-of-stock');
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({
        ...context,
        req,
        res,
        user,
      });

      return { ...wrappedProps, user };
    }

    return {
      user,
    };
  };

  Component.displayName = `withuser(${componentName})`;

  return Component;
}
