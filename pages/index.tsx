import { Layout } from '@components/layout/layout';
import Head from 'next/head';
import { ReactElement } from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>szeeta template web app</title>
        <meta name="description" content="custom szeeta web template" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center px-20">
        <h1 className="text-4xl font-bold">NEXTjs firebase authentication</h1>
        <p className="text-xl text-center mt-16">
          This is a demo project that uses the firebase client side SDK for
          display user information on the client side and uses iron-session to
          create a session for the user and uses that session to validate the
          user from the server side
        </p>
      </main>
    </div>
  );
};

// Add the layout
Home.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
