export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
  };
  searchInfo?: {
    textSnippet?: string;
  };
}

export interface BookListProps {
  books: Book[];
}
