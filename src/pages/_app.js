import { CookiesProvider } from 'react-cookie';
import UserContextProvider from '@contexts/UserContext/UserContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </CookiesProvider>
  );
}

export default MyApp;
