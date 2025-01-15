import { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from './BookList';
import styles from './Search.module.css';

interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
    };
}

const Search: React.FC = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        handleSearch(); // Fetch popular books on component mount
    }, []);

    const handleSearch = async (query: string = '') => {
        if (!query) {
            query = 'popular'; // Use a default query for popular books
        }
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=100`);
            setBooks(response.data.items);
        } catch (error) {
            console.error('Error fetching data from Google Books API:', error);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault(); 
        handleSearch(query); 
    };

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for books..."
                    className={styles.input}
                />
                <button className={styles.button} type="submit">Search</button>
            </form>
            {books && <BookList books={books} />}
        </div>
    );
};

export default Search;
