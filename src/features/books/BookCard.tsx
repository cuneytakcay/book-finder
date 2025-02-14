import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { BookCardProps } from '../../types/Book.type';
import styles from './BookCard.module.css';

// Redux toolkit
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../auth/authSlice';
import { updateUserLibrary } from '../auth/authActions';
import { saveBook } from './bookActions';

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    if (!user) return;
    if (selectedOption === '') return;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption.length]);

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
          <button onClick={() => setSelectedOption('have-read')}>
            Have read
          </button>
          <button onClick={() => setSelectedOption('want-to-read')}>
            Want to read
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;
