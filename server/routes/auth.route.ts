import express, { Request, Response } from 'express';
import {
  registerUser,
  loginUser,
  getLoggedInUser,
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

// Get logged in user
router.get('/user', verifyToken, async (req: Request, res: Response) => {
  try {
    await getLoggedInUser(req, res);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
