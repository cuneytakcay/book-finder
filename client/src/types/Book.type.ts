export interface GoogleBook {
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

export interface AppBook {
  authors?: string[];
  bookId: string;
  categories?: string[];
  description?: string;
  imgUrl?: string;
  infoLink?: string;
  subtitle?: string;
  textSnippet?: string;
  title: string;
}

export interface BookListProps {
  books: AppBook[];
}

export interface BookCardProps {
  book: AppBook;
}
