import BookCard from '../../components/BookCard';
import styles from './BookList.module.css';

import { useAppSelector } from '../../app/hooks';
import { selectAllBooks } from './booksSlice';

const BookList: React.FC = () => {
  const books = useAppSelector(selectAllBooks);

  return (
    <div className={styles.bookList}>
      {books?.map((book, index) => (
        <BookCard key={`${book.bookId}-${index}`} book={book} />
      ))}
    </div>
  );
};

export default BookList;
