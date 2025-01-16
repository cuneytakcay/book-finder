import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './BookDetail.module.css';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        setBook(response.data);

        // Set timeout for loading effect after fetching data
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setLoading(false); // Ensure loading is set to false on error
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <div className={styles.skeletonLoader}></div>;

  if (!book) return <div>No book details available.</div>;

  const handleClick = () => {
    navigate('/');
  };

  const placeholderImage =
    'https://placehold.co/400x600/e2e8f0/1e293b?text=No+Cover+Available';

  return (
    <div>
      {book && (
        <div className={styles.bookDetail}>
          <button onClick={handleClick}>Go to Book Search</button>
          <h1>{book.volumeInfo.title}</h1>
          <p>Authors: {book.volumeInfo.authors?.join(', ')}</p>
          <img
            src={book.volumeInfo.imageLinks?.thumbnail || placeholderImage}
            alt={book.volumeInfo.title}
          />
          <p>{book.volumeInfo.description}</p>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
