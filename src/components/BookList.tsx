import React, { useState, useEffect } from 'react';
import styles from './BookList.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Book } from '../types/Book';

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (books) {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [books]);

  return (
    <div className={styles.bookList}>
      {loading ? (
        <div className={styles.skeletonLoader}></div>
      ) : (
        books &&
        books.map((book) => (
          <div key={book.id} className={styles.card}>
            <img
              src={
                book.volumeInfo.imageLinks?.thumbnail ||
                'https://placehold.co/400x600/e2e8f0/1e293b?text=No+Cover+Available'
              }
              alt={
                book.volumeInfo.imageLinks?.thumbnail
                  ? `Cover of ${book.volumeInfo.title}`
                  : 'No cover available'
              }
            />
            <div className={styles.info}>
              <h3>{book.volumeInfo.title}</h3>
              <p className={styles.author}>
                By{' '}
                {book.volumeInfo.authors
                  ? book.volumeInfo.authors.join(', ')
                  : 'Unknown Author'}
              </p>
              <p className={styles.description}>
                {book.searchInfo?.textSnippet || 'No description available.'}
              </p>
              <Link className={styles.readMore} to={`/book/${book.id}`}>
                Read More <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookList;
