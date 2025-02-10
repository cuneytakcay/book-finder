import { Request, Response } from 'express';
import LibraryItem from '../models/libraryItem.model';

// Add a new book to the collection
export const createLibraryItem = async (req: Request, res: Response) => {
  try {
    const libraryItem = await LibraryItem.create(req.body);

    res
      .status(200)
      .json({ message: 'Library item created successfully', libraryItem });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
