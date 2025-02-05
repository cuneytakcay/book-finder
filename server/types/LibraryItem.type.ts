import { Document } from 'mongoose';

// Define an interface for the Collection document
export interface ILibraryItem extends Document {
  bookId: string;
  selectedOption: string;
}
