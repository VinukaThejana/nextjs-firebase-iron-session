import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirebaseAuth } from 'config/firebase';
import { UserContext } from 'context/user';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [user, loading] = useAuthState(getFirebaseAuth());

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
      }}
    >
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {getLayout(<Component {...pageProps} />)}
    </UserContext.Provider>
  );
};

export default MyApp;
