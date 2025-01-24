import BookCard from './BookCard';
import styles from './BookList.module.css';

import { useAppSelector } from '../../app/hooks';
import { selectAllBooks } from './booksSlice';

const BookList: React.FC = () => {
  const books = useAppSelector(selectAllBooks);

  return (
    <div className={styles.bookList}>
      {books?.map((book, index) => (
        <BookCard key={`${book.id}-${index}`} book={book} />
      ))}
    </div>
  );
};

export default BookList;
