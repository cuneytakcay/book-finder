import express, { Request, Response } from 'express';
import validator from 'express-validator';
import {
  registerUser,
  loginUser,
  getLoggedInUser,
} from '../controllers/auth.controller';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();
const { check } = validator;

// Register to create a user account
router.post(
  '/user/register',
  [
    check(['firstName', 'lastName'], 'Field cannot be empty').trim().notEmpty(),
    check('email', 'Not a valid email').isEmail().normalizeEmail(),
    check('password', 'Not a valid password').matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/
    ),
    check('confirm', 'Passwords do not match').custom(
      (value, { req }) => value === req.body.password
    ),
  ],
  async (req: Request, res: Response) => {
    try {
      await registerUser(req, res);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

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
