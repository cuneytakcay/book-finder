import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = decoded.user;
      next();
    } else {
      res.status(401).json({ message: 'Not authorized!' });
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

export default verifyToken;
