import { getFirebaseAuth } from 'config/firebase';
import { firebaseAdmin } from 'config/firebase-admin';
import { sessionOptions } from 'config/session';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Validate the user's login state from the server side and prevent from
// rendering this page if the user is logged in.
export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const uid = (await (req.session as any).uid) || '';
    const user = await firebaseAdmin
      .auth()
      .getUser(uid)
      .catch(() => null);

    if (user) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  },
  sessionOptions
);

const Login: NextPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col  items-center justify-center min-h-screen">
      <Head>
        <title>Login</title>
      </Head>

      <main className="flex flex-col items-center justify-center px-20">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-16"
          type="button"
          onClick={async () => {
            signInWithPopup(getFirebaseAuth(), new GoogleAuthProvider())
              .then(async (result) => {
                const idToken = await result.user.getIdToken();
                await fetch('/api/auth/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ idToken }),
                });
                await router.push('/dashboard');
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        >
          Login with Google
        </button>
      </main>
    </div>
  );
};

export default Login;
