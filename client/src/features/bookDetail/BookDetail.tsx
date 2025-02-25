import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookSaveButtons from '../../components/BookSaveButtons';
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

const BookDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const book = useAppSelector(selectBook);
  const loading = useAppSelector(selectBookLoading);
  const error = useAppSelector(selectBookError);
  const user = useAppSelector(selectUser);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      {loading ? (
        <Spinner spinnerText='Loading selected book...' />
      ) : book ? (
        <div className={styles['book-detail']}>
          <button onClick={() => navigate('/')}>Go to Book Search</button>
          <h1>{book.title}</h1>
          {book.subtitle && <h2>{book.subtitle}</h2>}
          {book.authors && (
            <p className={styles.authors}>
              <span style={{ fontWeight: 'bold' }}>Authors:</span>{' '}
              {book.authors?.join(', ')}
            </p>
          )}
          <div className={styles.content}>
            <div className={styles.imagebox}>
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
            </div>
            <div className={styles.info}>
              <div
                dangerouslySetInnerHTML={{
                  __html: book.description || '<p>No description available</p>',
                }}
              />
              {book.categories && (
                <p className={styles.categories}>
                  <span style={{ fontWeight: 'bold' }}>Categories:</span>{' '}
                  {book.categories?.join(', ')}
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
            {user && (
              <BookSaveButtons book={book} userLibrary={user?.library || []} />
            )}
          </div>
        </div>
      ) : (
        <p className={styles.error}>{error}</p>
      )}
    </div>
  );
};

export default BookDetail;
