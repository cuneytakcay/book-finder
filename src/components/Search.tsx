import { useState, useEffect } from 'react';
import axios from 'axios';
import { Book } from '../types/Book';
import BookList from './BookList';
import Loader from './Loader';
import styles from './Search.module.css';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleSearch('arts');
  }, []);

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=newest&maxResults=10&langRestrict=en`
      );

      setBooks(response.data.items);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data from Google Books API:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    handleSearch(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          value={query}
          onChange={handleChange}
          placeholder='Search for books...'
          className={styles.input}
        />
        <button className={styles.button} type='submit' disabled={!query}>
          Search
        </button>
      </form>
      {loading ? (
        <Loader />
      ) : books ? (
        <BookList books={books} />
      ) : (
        <p style={{ textAlign: 'center' }}>
          No books found. Please try searching for a different keyword.
        </p>
      )}
    </div>
  );
};

export default Search;
