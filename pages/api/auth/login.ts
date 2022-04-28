import { firebaseAdmin } from 'config/firebase-admin';
import { sessionOptions } from 'config/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { idToken } = req.body;

    if (!idToken) {
      res.status(401);
      throw new Error('No idToken provided');
    }

    const decoded = await firebaseAdmin.auth().verifyIdToken(idToken);
    (req.session as any).uid = decoded.uid;
    await req.session.save();
    res.send({ ok: true });
  },
  sessionOptions
);
