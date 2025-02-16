import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AppBook } from '../types/Book.type';
import { ILibraryItem } from '../types/Auth.type';
import styles from './BookCard.module.css';

// Redux toolkit
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUser } from '../features/auth/authSlice';
import { updateUserLibrary } from '..//features/auth/authActions';
import { saveBook } from '../features/books/bookActions';

const BookCard: React.FC<{ book: AppBook; userLibrary?: ILibraryItem[] }> = ({
  book,
  userLibrary,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [selectedOption, setSelectedOption] = useState('');
  const [savedOption, setSavedOption] = useState('');

  useEffect(() => {
    if (user && selectedOption.length) {
      const handleBookActions = async () => {
        await dispatch(saveBook(book));
        await dispatch(
          updateUserLibrary({
            userId: user._id,
            library: [...user.library, { bookId: book.bookId, selectedOption }],
          })
        );
      };

      handleBookActions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption.length]);

  useEffect(() => {
    if (userLibrary?.length) {
      const savedBook = userLibrary.find((lib) => lib.bookId === book.bookId);

      setSavedOption(savedBook?.selectedOption || '');
    }
  }, [userLibrary, book.bookId]);

  return (
    <div className={styles.card}>
      <div className={styles.imagebox}>
        <img
          src={
            book.imgUrl ||
            'https://placehold.co/128x193/e2e8f0/1e293b?text=No+Cover+Available'
          }
          alt={book.imgUrl ? `Cover of ${book.title}` : 'No cover available'}
          width={128}
          height={193}
        />
      </div>
      <div className={styles.info}>
        <h3>{book.title}</h3>
        <p className={styles.author}>
          By {book.authors ? book.authors.join(', ') : 'Unknown Author'}
        </p>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: book.textSnippet || 'No description available',
          }}
        />
        <Link className={styles.readMore} to={`/book/${book.bookId}`}>
          Read More <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
      {user && (
        <div className={styles.select}>
          {savedOption === '' ? (
            <>
              <button onClick={() => setSelectedOption('have-read')}>
                Have read
              </button>
              <button onClick={() => setSelectedOption('want-to-read')}>
                Want to read
              </button>
            </>
          ) : savedOption === 'want-to-read' ? (
            <>
              <p className={styles.status}>Want to read this book</p>
              <button onClick={() => setSelectedOption('')}>
                Remove book from library
              </button>
            </>
          ) : (
            <p className={styles.status}>Have read this book</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookCard;
