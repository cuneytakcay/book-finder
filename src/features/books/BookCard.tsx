import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { BookCardProps } from '../../types/Book';
import styles from './BookCard.module.css';

const BookCard: React.FC<BookCardProps> = ({ book }) => {
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
    </div>
  );
};

export default BookCard;
