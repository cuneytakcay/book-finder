import styles from './BookList.module.css';

interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        imageLinks?: {
            thumbnail?: string;
        };
    };
}

interface BookListProps {
    books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
    return (
        <div className={styles.bookList}>
            {books && books.map((book) => (
                <div key={book.id} className={styles.card}>
                    {book.volumeInfo.imageLinks?.thumbnail ? <img src={book.volumeInfo.imageLinks.thumbnail} alt={`Cover of ${book.volumeInfo.title}`} /> : <p>No image available</p>}
                    <div className={styles.info}>
                        <h3>{book.volumeInfo.title}</h3>
                        <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookList;
