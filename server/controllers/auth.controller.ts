import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

// Register to create a user account
export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await User.register(req.body);

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Login to get a JWT token
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Wrong credentials' });
    }
    const bytes = CryptoJS.AES.decrypt(
      user.password,
      process.env.CRYPTO_SECRET_KEY
    );
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== password) {
      return res.status(401).json({ message: 'Wrong credentials' });
    }
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '12h',
      },
      (error: Error | null, token: string | null) => {
        if (error) throw error;
        res.status(200).json({ token });
      }
    );
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
