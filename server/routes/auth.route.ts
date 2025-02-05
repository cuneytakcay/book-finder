import express, { Request, Response } from 'express';
import {
  registerUser,
  loginUser,
  updateUser,
} from '../controllers/auth.controller';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();

// Register to create a user account
router.post('/user/register', async (req: Request, res: Response) => {
  try {
    await registerUser(req, res);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login to get a JWT token
router.post('/user/login', async (req: Request, res: Response) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Protected route to get user information
router.get('/user', verifyToken, async (req: Request, res: Response) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Protected route to update user information
router.patch('/user/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    await updateUser(req, res);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
