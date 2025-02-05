import express, { Request, Response } from 'express';
import verifyToken from '../middleware/verifyToken';
import { createLibraryItem } from '../controllers/libraryItems.controller';

const router = express.Router();

// Register to create a user account
router.post('/', verifyToken, async (req: Request, res: Response) => {
  try {
    await createLibraryItem(req, res);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
