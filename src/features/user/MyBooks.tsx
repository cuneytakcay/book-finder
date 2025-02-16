import { useEffect } from 'react';
import BookCard from '../../components/BookCard';
import Spinner from '../../components/Spinner';
import styles from './MyBooks.module.css';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../auth/authSlice';
import { getBooksByIds } from './userBooksAction';
import {
  selectUserBooks,
  selectBooksLoading,
  selectBooksError,
} from './userBooksSlice';

const MyBooks: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const books = useAppSelector(selectUserBooks);
  const loading = useAppSelector(selectBooksLoading);
  const error = useAppSelector(selectBooksError);

  useEffect(() => {
    if (user?.library.length) {
      const bookIds = user.library.map((lib) => lib.bookId);
      dispatch(getBooksByIds(bookIds));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.library.length]);

  return (
    <div>
      {loading ? (
        <Spinner spinnerText={`Loading books...`} />
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.bookList}>
          {books?.map((book, index) => (
            <BookCard
              key={`${book.bookId}-${index}`}
              book={book}
              userLibrary={user?.library || []}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default MyBooks;
