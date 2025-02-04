declare namespace Express {
  export interface Request {
    user?: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }
}
