import { Schema, model } from 'mongoose';
import { IBook } from '../types/Book.type';

const bookSchema = new Schema<IBook>(
  {
    authors: { type: [String] },
    bookId: { type: String, required: true, unique: true },
    categories: { type: [String] },
    description: { type: String },
    imgUrl: { type: String },
    infoLink: { type: String },
    subtitle: { type: String },
    textSnippet: { type: String },
    title: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Book = model<IBook>('Book', bookSchema);

export default Book;
