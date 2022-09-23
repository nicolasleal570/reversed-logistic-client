import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { fetchCurrentUser } from '@api/auth/methods';
import { useUser } from '@hooks/useUser';
import { useCookies } from 'react-cookie';
import { useAuth } from '@hooks/useAuth';

const redirectUrl = '/login?redirected=true';

export function withProtection(WrappedComponent) {
  const componentName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component';

  const Component = ({ ...props }) => {
    const router = useRouter();
    const [cookies] = useCookies();
    const { handleLogout } = useAuth();
    const { setUser, user, loading, setLoading } = useUser();

    const handleFetchCurrentUser = async () => {
      try {
        setLoading(true);

        if (!cookies.token) {
          await handleLogout();
          setLoading(false);
        }

        const { data } = await fetchCurrentUser(cookies.token);

        if (data.isLocation) {
          setUser({ ...data.location, isLocation: data.isLocation });
          router.push('/out-of-stock');
        } else {
          setUser({ ...data.user, isLocation: data.isLocation });
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        router.push(redirectUrl);
      }
    };

    useEffect(() => {
      handleFetchCurrentUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (!user && !loading) {
        router.push(redirectUrl);
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return <></>;
    }

    return <WrappedComponent {...props} />;
  };

  Component.getInitialProps = async ({ req, res, ...context }) => {
    if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({
        ...context,
        req,
        res,
      });

      return { ...wrappedProps };
    }

    return {};
  };

  Component.displayName = `withuser(${componentName})`;

  return Component;
}
