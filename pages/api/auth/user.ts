import { firebaseAdmin } from 'config/firebase-admin';
import { sessionOptions } from 'config/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const uid = (req.session as any).uid || '';
    const user = await firebaseAdmin
      .auth()
      .getUser(uid)
      .catch(() => null);

    res.status(200).json(user ? { user: user } : { user: null });
  },
  sessionOptions
);
