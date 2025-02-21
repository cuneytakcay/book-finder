import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
      };
    }
  }
}
