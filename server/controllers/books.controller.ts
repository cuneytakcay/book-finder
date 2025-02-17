import { Request, Response } from 'express';
import Book from '../models/book.model';

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    // Check to see if the book already exists
    const { bookId } = req.body;
    const bookExists = await Book.findOne({ bookId });

    if (bookExists) {
      return res
        .status(409)
        .json({ message: 'Book with this ID already exists' });
    }

    const book = await Book.create(req.body);

    res.status(200).json({ message: 'Book created successfully', book });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get books by an array of bookIds
export const getBooksByIds = async (req: Request, res: Response) => {
  try {
    const { bookIds } = req.params;
    const idArray = bookIds.split(',');

    const books = await Book.find({ bookId: { $in: idArray } });

    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
