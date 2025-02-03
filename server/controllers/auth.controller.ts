import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const createToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '3d',
  });
};

// Register to create a user account
export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await User.register(req.body);
    const token = createToken(user._id as string);

    res
      .status(201)
      .json({ message: 'User created successfully', email: user.email, token });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Login to get a JWT token
export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await User.login(req.body);
    const token = createToken(user._id as string);

    res.status(200).json({
      message: 'Token generated successfully',
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get logged in user
export const getLoggedInUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select('-password');

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
