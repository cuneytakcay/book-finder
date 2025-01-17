import BookCard from './BookCard';
import { BookListProps } from '../types/Book';
import styles from './BookList.module.css';

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className={styles.bookList}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
