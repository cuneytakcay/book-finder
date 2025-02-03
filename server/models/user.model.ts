import { Schema, model, Document, Model } from 'mongoose';
import CryptoJS from 'crypto-js';

// Define an interface for the User document
interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserModel extends Model<IUser> {
  register: (userData: IUser) => Promise<IUser>;
}

// Define the User schema
const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Static method for registering a new user
userSchema.statics.register = async function ({
  firstName,
  lastName,
  email,
  password,
}: IUser) {
  const hashedPassword = CryptoJS.AES.encrypt(
    password,
    process.env.CRYPTO_SECRET_KEY
  ).toString();

  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  return user;
};

// Create the User model
const User: IUserModel = model<IUser, IUserModel>('User', userSchema);

export default User;
