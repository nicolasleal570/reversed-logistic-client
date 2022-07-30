import { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import UserContextProvider from '@contexts/UserContext/UserContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    dayjs.locale('es');
  }, []);

  return (
    <CookiesProvider>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </CookiesProvider>
  );
}

export default MyApp;
