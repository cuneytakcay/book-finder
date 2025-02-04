import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import styles from './BookDetail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchBookById,
  selectBook,
  selectBookLoading,
  selectBookError,
} from './bookDetailSlice';
import { selectUser } from '../auth/authSlice';
import { openModal } from '../modal/modalSlice';

const BookDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const book = useAppSelector(selectBook);
  const loading = useAppSelector(selectBookLoading);
  const error = useAppSelector(selectBookError);
  const user = useAppSelector(selectUser);

  const [selectedOption, setSelectedOption] = useState('');

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id));
    }
  }, [dispatch, id]);

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
  }, [dispatch, selectedOption, user]);

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div>
      {loading ? (
        <Spinner spinnerText='Loading selected book...' />
      ) : book ? (
        <div className={styles['book-detail']}>
          <button onClick={handleClick}>Go to Book Search</button>
          <h1>{book.volumeInfo.title}</h1>
          {book.volumeInfo.subtitle && <h2>{book.volumeInfo.subtitle}</h2>}
          {book.volumeInfo.authors && (
            <p className={styles.authors}>
              <span style={{ fontWeight: 'bold' }}>Authors:</span>{' '}
              {book.volumeInfo.authors?.join(', ')}
            </p>
          )}
          <div className={styles.content}>
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
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    book.volumeInfo.description ||
                    '<p>No description available</p>',
                }}
              />
              {book.volumeInfo.categories && (
                <p className={styles.categories}>
                  <span style={{ fontWeight: 'bold' }}>Categories:</span>{' '}
                  {book.volumeInfo.categories?.join(', ')}
                </p>
              )}
              <a
                href={`https://books.google.com/books?id=${id}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                Check it on Google Books
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
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
        </div>
      ) : (
        <p className={styles.error}>{error}</p>
      )}
    </div>
  );
};

export default BookDetail;
