import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { BookCardProps } from '../../types/Book.type';
import styles from './BookCard.module.css';

// Redux toolkit
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../auth/authSlice';
import { openModal } from '../modal/modalSlice';

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    if (selectedOption && selectedOption.length > 0) {
      if (user) {
        console.log(user);
        // Function to save the book to the books collection
        // Function to save the book id to the user's books collection
      } else {
        dispatch(openModal('login'));
      }
    }
  }, [selectedOption, dispatch, user]);

  return (
    <div className={styles.card}>
      <div className={styles.imagebox}>
        <img
          src={
            book.volumeInfo.imageLinks?.thumbnail ||
            'https://placehold.co/128x193/e2e8f0/1e293b?text=No+Cover+Available'
          }
          alt={
            book.volumeInfo.imageLinks?.thumbnail
              ? `Cover of ${book.volumeInfo.title}`
              : 'No cover available'
          }
          width={128}
          height={193}
        />
      </div>
      <div className={styles.info}>
        <h3>{book.volumeInfo.title}</h3>
        <p className={styles.author}>
          By{' '}
          {book.volumeInfo.authors
            ? book.volumeInfo.authors.join(', ')
            : 'Unknown Author'}
        </p>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: book.searchInfo?.textSnippet || 'No description available',
          }}
        />
        <Link className={styles.readMore} to={`/book/${book.id}`}>
          Read More <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
      <select
        className={styles.select}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value=''>--Select an option--</option>
        <option value='have-read'>Have read</option>
        <option value='want-to-read'>Want to read</option>
      </select>
    </div>
  );
};

export default BookCard;
