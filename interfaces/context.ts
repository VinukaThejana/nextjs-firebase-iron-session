/**
 * @description interface for the user context
 */

import { User } from 'firebase/auth';

export interface IUserContext {
  user: User | null | undefined;
  loading: boolean | undefined;
}
