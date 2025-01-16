import { useState, useEffect } from "react";
import axios from "axios";
import { Book } from "./BookList";
import BookList from "./BookList";
import styles from "./Search.module.css";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleSearch(query);
    }, 300); // Adjust the delay as necessary
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handleSearch = async (query: string = "") => {
    if (!query) {
      query = "cooking";
    }

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=newest&maxResults=10&langRestrict=en`
      );
      setBooks(response.data.items);
    } catch (error) {
      console.error("Error fetching data from Google Books API:", error);
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
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
      {books && <BookList books={books} />}
    </div>
  );
};

export default Search;
