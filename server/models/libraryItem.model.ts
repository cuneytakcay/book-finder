import { Schema, model } from 'mongoose';
import { ILibraryItem } from '../types/LibraryItem.type';

const libraryItemSchema = new Schema<ILibraryItem>(
  {
    bookId: { type: String, required: true },
    selectedOption: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const LibraryItem = model<ILibraryItem>('LibraryItem', libraryItemSchema);

export default LibraryItem;
