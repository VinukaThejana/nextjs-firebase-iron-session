import { getFirebaseAuth } from 'config/firebase';
import { firebaseAdmin } from 'config/firebase-admin';
import { sessionOptions } from 'config/session';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

// validate the user logged in status from the server side and stop the user
// from accessing the page if they are logged in
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

const SignUp: NextPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Sign Up</title>
      </Head>

      <main className="flex flex-col items-center justify-center px-20">
        <h1 className="text-4xl font-bold">Sign Up</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-16"
          type="button"
          onClick={async () => {
            signInWithPopup(getFirebaseAuth(), new GoogleAuthProvider())
              .then((result) => {
                console.log(result);
                router.push('/dashboard');
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        >
          Sign Up
        </button>
      </main>
    </div>
  );
};

export default SignUp;
