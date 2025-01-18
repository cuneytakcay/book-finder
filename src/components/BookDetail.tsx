import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import { Book } from '../types/Book';
import styles from './BookDetail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        setBook(response.data);

        // Set timeout for loading effect after fetching data
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setLoading(false); // Ensure loading is set to false on error
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : book ? (
        <div className={styles.bookDetail}>
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
                <p>
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
          </div>
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>This book cannot be found.</p>
      )}
    </div>
  );
};

export default BookDetail;
