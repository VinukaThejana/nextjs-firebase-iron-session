import { Layout } from '@components/layout/layout';
import { getFirebaseAuth } from 'config/firebase';
import { useUserContext } from 'context/user';
import { signOut, updateProfile, User } from 'firebase/auth';
import { useStorage } from 'hooks/usestorage';
import { IFile } from 'interfaces/utils';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PencilIcon } from '@heroicons/react/solid';
import { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from 'config/session';
import { firebaseAdmin } from 'config/firebase-admin';

// Gte the user from the server side
export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const id = (await (req.session as any).uid) || '';
    const user = await firebaseAdmin
      .auth()
      .getUser(id)
      .catch(() => null);

    if (!user) {
      return {
        redirect: {
          destination: '/login',
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

const Dashboard = () => {
  const { user, loading } = useUserContext();
  const router = useRouter();

  // Profile picture change related stuff
  const [profilePicture, setProfilePicture] = useState<IFile | null>(null);

  const profilePictureUploadRef = useRef<HTMLInputElement>(null);

  const triggerProfilePictureUpload = () => {
    profilePictureUploadRef.current?.click();
  };

  const handleProfilePictureUploadEvent = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    event.target.files instanceof FileList &&
      setProfilePicture(event.target.files[0] as unknown as IFile);
  };

  const [url, progress] = useStorage(
    profilePicture,
    user?.uid,
    'profile_picture'
  );

  useEffect(() => {
    if (url) {
      updateProfile(getFirebaseAuth().currentUser as User, {
        photoURL: url,
      })
        .then(async () => {
          setProfilePicture(null);
          await getFirebaseAuth().currentUser?.reload();
          await router.push('/dashboard');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [url]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Dashboard</title>
      </Head>

      <main className="flex flex-col items-center justify-center px-20">
        {loading ? null : (
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <Image
                src={
                  getFirebaseAuth().currentUser?.photoURL ||
                  `https://avatars.dicebear.com/v2/identicon/${user?.uid}.svg`
                }
                alt={'Profile picture of ' + user?.displayName}
                width={200}
                height={200}
                className="rounded-full shadow-lg"
              />

              <>
                <form className="z-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUploadEvent}
                    ref={profilePictureUploadRef}
                    className="hidden"
                  />
                  {(0 < progress && progress < 100) || profilePicture ? (
                    <div className="h-12 z-50 -mt-8 ml-24 bg-black rounded-full p-2">
                      <div className="w-8 h-8 bg-blue-400 rounded-full animate-pulse"></div>
                    </div>
                  ) : (
                    <PencilIcon
                      className="h-12 z-50 -mt-8 ml-24 bg-black rounded-full p-2"
                      type="button"
                      onClick={triggerProfilePictureUpload}
                    />
                  )}
                </form>
              </>
            </div>

            <div className="flex flex-col items-center justify-center mt-4">
              <h1 className="text-2xl font-bold">{user?.displayName}</h1>
              <h2 className="text-lg font-bold">{user?.email}</h2>
            </div>
          </div>
        )}

        {/* Logout button */}
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-16"
          onClick={async () => {
            signOut(getFirebaseAuth()).then(async () => {
              await fetch('/api/auth/logout', {
                method: 'POST',
              });
            });
            await router.push('/');
          }}
        >
          Logout
        </button>
      </main>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
