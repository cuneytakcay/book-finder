import { Request, Response } from 'express';
import mongoose from 'mongoose';
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
    const message =
      error.code === 11000 ? 'User already exists' : error.message;

    res.status(409).json({ message });
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

// Update user information
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'User not found' });
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
