import BookCard from '../../components/BookCard';
import BookSaveButtons from '../../components/BookSaveButtons';
import styles from './BookList.module.css';

// Redux toolkit
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/auth/authSlice';
import { selectAllBooks } from './booksSlice';

const BookList: React.FC = () => {
  const books = useAppSelector(selectAllBooks);
  const user = useAppSelector(selectUser);

  return (
    <div className={styles.bookList}>
      {books?.map((book, index) => (
        <div className={styles['card-wrapper']} key={`${book.bookId}-${index}`}>
          <BookCard book={book} />
          {user && <BookSaveButtons book={book} />}
        </div>
      ))}
    </div>
  );
};

export default BookList;
