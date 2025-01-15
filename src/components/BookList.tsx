interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        imageLinks?: {
            thumbnail: string;
        };
    };
}

interface BookListProps {
    books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
    return (
        <div>
            {books && books.map((book) => (
                <div key={book.id}>
                    <h3>{book.volumeInfo.title}</h3>
                    <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
                    {book.volumeInfo.imageLinks && <img src={book.volumeInfo.imageLinks.thumbnail} alt={`Cover of ${book.volumeInfo.title}`} />}
                </div>
            ))}
        </div>
    );
};

export default BookList;
