import { GoogleBook } from '../types/Book.type';

export const serverToClientBook = (book: GoogleBook) => {
  return {
    authors: book.volumeInfo.authors,
    bookId: book.id,
    categories: book.volumeInfo.categories,
    description: book.volumeInfo.description,
    imgUrl: book.volumeInfo.imageLinks?.thumbnail,
    infoLink: book.volumeInfo.infoLink,
    subtitle: book.volumeInfo.subtitle,
    textSnippet: book.searchInfo?.textSnippet,
    title: book.volumeInfo.title,
  };
};
