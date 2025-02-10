import { useState } from 'react';
import BookList from './BookList';
import Pagination from '../pagination/Pagination';
import Spinner from '../../components/Spinner';
import styles from './BookSearch.module.css';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectTotalItems,
  selectBooksLoading,
  selectBooksError,
} from './booksSlice';
import { fetchBooks } from './bookActions';

const BookSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector(selectTotalItems);
  const loading = useAppSelector(selectBooksLoading);
  const error = useAppSelector(selectBooksError);

  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const pageCount = Math.ceil(totalItems / 10); // Assuming 10 books per page

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(fetchBooks({ query, startIndex: 0 }));
    setIsInitialRender(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const renderNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
      dispatch(fetchBooks({ query, startIndex: currentPage * 10 }));
    }
  };

  const renderPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      dispatch(fetchBooks({ query, startIndex: (currentPage - 2) * 10 }));
    }
  };

  const pagination =
    totalItems > 0 && !loading && !error ? (
      <Pagination
        currentPage={currentPage}
        totalPages={pageCount}
        onNext={renderNextPage}
        onPrevious={renderPreviousPage}
      />
    ) : null;

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
      {pagination}
      {loading ? (
        <Spinner spinnerText={`Loading ${query} books...`} />
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <>
          {isInitialRender ? (
            <p className={styles.info}>
              Enter a keyword and click search button to start
            </p>
          ) : (
            <BookList />
          )}
        </>
      )}
      {pagination}
    </div>
  );
};

export default BookSearch;
