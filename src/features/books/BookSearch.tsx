import { useState, useEffect } from 'react';
import BookList from './BookList';
import Loader from '../../components/Loader';
import styles from './BookSearch.module.css';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchBooks, selectBooksLoading, selectBooksError } from './booksSlice';

const BookSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectBooksLoading);
  const error = useAppSelector(selectBooksError);

  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(fetchBooks('culinary'));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchBooks(query));
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
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <BookList />
      )}
    </div>
  );
};

export default BookSearch;
