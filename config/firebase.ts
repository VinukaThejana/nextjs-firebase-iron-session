import { FirebaseApp, getApp } from 'firebase/app';
import type { Auth as FirebaseAuth } from 'firebase/auth';

import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { FirebaseStorage, getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const getFirebaseApp = (): FirebaseApp | undefined => {
  if (getApps().length > 0) {
    return getApp();
  } else {
    return initializeApp(firebaseConfig);
  }
};

// Authentication
export const getFirebaseAuth = (): FirebaseAuth => {
  return getAuth(getFirebaseApp());
};

// Storage
export const getFirebaseStorage = (): FirebaseStorage | undefined => {
  if (typeof window === 'undefined') return;

  return getStorage(getFirebaseApp());
};
