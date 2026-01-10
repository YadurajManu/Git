import type { Request, Response, NextFunction } from 'express';
import { admin } from '../config/firebase.js';

export interface AuthRequest extends Request {
  user?: any;
}

export const verifyAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error verifying auth token:', error);
    res.status(401).json({ error: 'Unauthorized: Token verification failed' });
  }
};
