import { Schema, model, Document, Model } from 'mongoose';
import CryptoJS from 'crypto-js';
import validator from 'validator';

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
  login: (credentials: { email: string; password: string }) => Promise<IUser>;
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
  const errors: string[] = [];

  if (validator.isEmpty(firstName)) errors.push('First name cannot be empty');

  if (validator.isEmpty(lastName)) errors.push('Last name cannot be empty');

  if (!email || !validator.isEmail(email)) errors.push('Invalid email');

  if (
    !validator.matches(
      password,
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
    )
  )
    errors.push(
      'Password must contain at least one number and one special character and must be at least 8 characters long'
    );

  if (errors.length) throw new Error(errors.join(', '));

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

// Static method for logging in a user
userSchema.statics.login = async function ({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await this.findOne({ email });

  if (!user) throw new Error('Invalid user credentials');

  const bytes = CryptoJS.AES.decrypt(
    user.password,
    process.env.CRYPTO_SECRET_KEY
  );
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

  if (originalPassword !== password)
    throw new Error('Invalid user credentials');

  return user;
};

// Create the User model
const User: IUserModel = model<IUser, IUserModel>('User', userSchema);

export default User;
