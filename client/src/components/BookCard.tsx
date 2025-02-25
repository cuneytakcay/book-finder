import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AppBook } from '../types/Book.type';
import styles from './BookCard.module.css';

const BookCard: React.FC<{ book: AppBook }> = ({ book }) => {
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
    </div>
  );
};

export default BookCard;
