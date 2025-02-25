import { Link } from 'react-router-dom';
import styles from './BookListInitial.module.css';

import { useAppSelector } from '../../app/hooks';
import { selectInitialBooks } from './booksSlice';

const BookListInitial: React.FC = () => {
  const books = useAppSelector(selectInitialBooks);

  return (
    <div className={styles.bookList}>
      {books?.map((book, index) => (
        <div className={styles.imagebox} key={`${book.bookId}-${index}`}>
          <Link to={`/book/${book.bookId}`}>
            <img
              src={
                book.imgUrl ||
                'https://placehold.co/128x193/e2e8f0/1e293b?text=No+Cover+Available'
              }
              alt={
                book.imgUrl ? `Cover of ${book.title}` : 'No cover available'
              }
              width={128}
              height={193}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BookListInitial;
