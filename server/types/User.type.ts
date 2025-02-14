import { Document, Model } from 'mongoose';

// Define an interface for the User document
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  library: { bookId: string; selectedOption: string }[] | [];
}

// Define an interface for the User model
export interface IUserModel extends Model<IUser> {
  register: (userData: IUser) => Promise<IUser>;
  login: (credentials: { email: string; password: string }) => Promise<IUser>;
}
