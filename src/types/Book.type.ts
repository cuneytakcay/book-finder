export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors?: string[];
    description?: string;
    categories?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
    infoLink?: string;
  };
  searchInfo?: {
    textSnippet?: string;
  };
}

export interface BookListProps {
  books: Book[];
}

export interface BookCardProps {
  book: {
    authors?: string[];
    bookId: string;
    categories?: string[];
    description?: string;
    imgUrl?: string;
    infoLink?: string;
    subtitle?: string;
    textSnippet?: string;
    title: string;
  };
}
