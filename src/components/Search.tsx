import { useState, useEffect } from 'react';
import axios from 'axios';
import { Book } from '../types/Book';
import BookList from './BookList';
import Loader from './Loader';
import Pagination from './Pagination';
import styles from './Search.module.css';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState(
    'No books found. Please try searching for a different keyword.'
  );
  const itemsPerPage = 10;

  useEffect(() => {
    handleSearch('arts');
  }, []);

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=newest&maxResults=40&langRestrict=en`
      );

      setSearchResults(response.data.items);
      // Set timeout for loading effect after fetching data
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Request failed with status code 429'
      ) {
        setErrorMessage('API rate limit exceeded. Please try again later.');
      } else {
        setErrorMessage('An unknown error occurred. Please try again later.');
      }
      setLoading(false); // Ensure loading is set to false on error
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setLoading(true);
      setCurrentPage(currentPage + 1);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setLoading(true);
      setCurrentPage(currentPage - 1);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
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
      ) : searchResults.length > 0 ? (
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNext={handleNextPage}
            onPrevious={handlePreviousPage}
          />
          <BookList books={currentItems} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNext={handleNextPage}
            onPrevious={handlePreviousPage}
          />
        </div>
      ) : (
        <p className='error'>{errorMessage}</p>
      )}
    </div>
  );
};

export default Search;
