import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  const handleClick = () => {
    navigate("/");
  };

  const placeholderImage = "https://placehold.co/400x600/e2e8f0/1e293b?text=No+Cover+Available";

  return (
    <div>
      <button onClick={handleClick}>Go to Book Search</button>
      <h1>{book.volumeInfo.title}</h1>
      <p>Authors: {book.volumeInfo.authors?.join(", ")}</p>
      <img
        src={book.volumeInfo.imageLinks?.thumbnail || placeholderImage}
        alt={book.volumeInfo.title}
      />
      <p>{book.volumeInfo.description}</p>
    </div>
  );
};

export default BookDetail;
