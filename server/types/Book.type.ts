import { Document } from 'mongoose';

// Define an interface for the User document
export interface IBook extends Document {
  authors?: string[];
  bookId: string;
  categories?: string[];
  description?: string;
  imgUrl?: string;
  infoLink?: string;
  subtitle?: string;
  title: string;
  textSnippet?: string;
}
