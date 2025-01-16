import styles from "./BookList.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
  };
  searchInfo: {
    textSnippet?: string;
  };
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className={styles.bookList}>
      {books &&
        books.map((book) => (
          <div key={book.id} className={styles.card}>
            <img 
              src={book.volumeInfo.imageLinks?.thumbnail || "https://placehold.co/400x600/e2e8f0/1e293b?text=No+Cover+Available"}
              alt={
                book.volumeInfo.imageLinks?.thumbnail
                  ? `Cover of ${book.volumeInfo.title}`
                  : 'No cover available'
              }
            />
            <div className={styles.info}>
              <h3>{book.volumeInfo.title}</h3>
              <p className={styles.author}>
                By{" "}
                {book.volumeInfo.authors
                  ? book.volumeInfo.authors.join(", ")
                  : "Unknown Author"}
              </p>
              <p className={styles.description}>
                {book.searchInfo?.textSnippet || "No description available."}
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
