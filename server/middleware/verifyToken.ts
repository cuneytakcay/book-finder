import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { IUser } from '../types/User.type';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    if (token) {
      const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const user = await User.findById(id).select('-password');

      req.user = user as IUser & { _id: string };

      next();
    } else {
      res.status(401).json({ message: 'Not authorized!' });
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

export default verifyToken;
