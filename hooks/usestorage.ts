import { getFirebaseStorage } from 'config/firebase';
import {
  FirebaseStorage,
  getDownloadURL,
  ref,
  StorageError,
  uploadBytesResumable,
} from 'firebase/storage';
import { IFile } from 'interfaces/utils';
import { useEffect, useState } from 'react';

/**
 * @description upload any given file to the firebase storage
 * @param {IFile | null} file - File to be uploaded
 * @param {string | undefined} userId - userId of the user
 * @param {string} path - users/{userId}/{path}/{file.name}
 * @returns {number} progress - The file upoad progress
 * @returns {string | null} url - The url of the uploaded file
 * @returns {StorageError | null} error - The error if any
 */

export const useStorage = (
  file: IFile | null,
  userId: string | undefined,
  path: string
): [string | null, number, StorageError | null] => {
  // states
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<StorageError | null>(null);

  useEffect(() => {
    if (file && userId) {
      const storage = getFirebaseStorage();

      // metadata for the selected file
      const metadata = {
        contentType: file.type,
      };

      const storageRef = ref(
        storage as FirebaseStorage,
        `users/${userId}/${path}/${file.name}`
      );
      const uploadTask = uploadBytesResumable(
        storageRef,
        file as unknown as Blob,
        metadata
      );

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);

          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          setError(error);

          switch (error.code) {
            case 'storage/unauthorized':
              console.log('unauthorized');
              break;
            case 'storage/canceled':
              console.log('canceled');
              break;
            case 'storage/unknown':
              console.log('Unknown error');
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
          });
        }
      );
    }
  }, [file]);

  return [url, progress, error];
};
