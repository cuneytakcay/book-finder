import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { BookListProps } from '../types/Book';
import styles from './BookList.module.css';

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className={styles.bookList}>
      {books.map((book) => (
        <div key={book.id} className={styles.card}>
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
          <div className={styles.info}>
            <h3>{book.volumeInfo.title}</h3>
            <p className={styles.author}>
              By{' '}
              {book.volumeInfo.authors
                ? book.volumeInfo.authors.join(', ')
                : 'Unknown Author'}
            </p>
            <p className={styles.description}>
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    book.searchInfo?.textSnippet || 'No description available',
                }}
              />
            </p>
            <Link className={styles.readMore} to={`/book/${book.id}`}>
              Read More <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
