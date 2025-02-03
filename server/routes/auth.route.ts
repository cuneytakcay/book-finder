import express, { Request, Response } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';

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

export default router;
