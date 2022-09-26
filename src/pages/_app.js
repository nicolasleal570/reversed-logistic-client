import { useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';
import NProgress from 'nprogress';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import UserContextProvider from '@contexts/UserContext/UserContext';
import '../styles/globals.css';
import '../styles/nprogress.css';

const metaTitle = 'Reversed Logistic App';
const metaDescription =
  'Una aplicación para controlar la logística inversa de tu empresa cervecera';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

NProgress.configure({
  showSpinner: false,
});

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    dayjs.locale('es');
  }, []);

  return (
    <CookiesProvider>
      <UserContextProvider>
        <Head>
          <title>{metaTitle}</title>
          <meta property="og:title" content={metaTitle} />
          <meta name="twitter:title" content={metaTitle} />
          <meta name="description" content={metaDescription} />
          <meta property="og:description" content={metaDescription} />
          <meta name="twitter:description" content={metaDescription} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <Component {...pageProps} />
      </UserContextProvider>
    </CookiesProvider>
  );
}

export default MyApp;
