import { getFirebaseAuth } from 'config/firebase';
import { useUserContext } from 'context/user';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';

const Navbar: FunctionComponent = () => {
  const { user, loading } = useUserContext();
  const router = useRouter();

  return (
    <nav className="bg-gray-900 text-center lg:text-left p-6">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="flex px-2">
          <Link href="/">NEXT FIREBASE AUTH</Link>
        </div>

        {!loading ? (
          <div className="flex flex-col items-center justify-center">
            {!user ? (
              <div className="flex flex-col">
                <div className="flex flex-row items-center justify-center">
                  <Link href="/login">
                    <a className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-8 rounded-full mx-2">
                      Login
                    </a>
                  </Link>
                  <Link href="/sign-up">
                    <a className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-8 rounded-full mx-2">
                      Sign-up
                    </a>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={
                    getFirebaseAuth().currentUser?.photoURL ||
                    `https://avatars.dicebear.com/api/identicon/${user.uid}.svg`
                  }
                  alt={user.displayName || 'profile picture'}
                  width={50}
                  height={50}
                  className="rounded-full mr-2"
                  onClick={() => router.push('/dashboard')}
                />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export { Navbar };
