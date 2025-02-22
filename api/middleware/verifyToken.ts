import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { IUser } from '../types/User.type';

interface JwtPayload {
  id: string;
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    if (token) {
      const tokenPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);

      if (typeof tokenPayload !== 'string' && 'id' in tokenPayload) {
        const { id } = tokenPayload as JwtPayload;

        const user = await User.findById(id).select('-password');

        req.user = user as IUser & { _id: string };

        next();
      } else {
        res.status(401).json({ message: 'Invalid token payload' });
      }
    } else {
      res.status(401).json({ message: 'Not authorized!' });
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

export default verifyToken;
