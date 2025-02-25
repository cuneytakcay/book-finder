import { useEffect, useState } from 'react';
import { AppBook } from '../types/Book.type';
import { ILibraryItem } from '../types/Auth.type';
import styles from './BookSaveButtons.module.css';

// Redux toolkit
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUser } from '../features/auth/authSlice';
import { updateUserLibrary } from '..//features/auth/authActions';
import { saveBook } from '../features/books/bookActions';

const BookSaveButtons: React.FC<{
  book: AppBook;
  userLibrary?: ILibraryItem[];
}> = ({ book, userLibrary }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [selectedOption, setSelectedOption] = useState('');
  const [savedOption, setSavedOption] = useState('');

  useEffect(() => {
    if (user && selectedOption.length) {
      const handleBookActions = async () => {
        await dispatch(saveBook(book));
        await dispatch(
          updateUserLibrary({
            userId: user._id,
            library: [...user.library, { bookId: book.bookId, selectedOption }],
          })
        );
      };

      handleBookActions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption.length]);

  useEffect(() => {
    if (userLibrary?.length) {
      const savedBook = userLibrary.find((lib) => lib.bookId === book.bookId);

      setSavedOption(savedBook?.selectedOption || '');
    }
  }, [userLibrary, book.bookId]);

  const removeFromLibrary = () => {
    if (user) {
      dispatch(
        updateUserLibrary({
          userId: user._id,
          library: user.library.filter((lib) => lib.bookId !== book.bookId),
        })
      );
    }
  };

  const updateToHaveRead = () => {
    if (user) {
      dispatch(
        updateUserLibrary({
          userId: user._id,
          library: user.library.map((lib) =>
            lib.bookId === book.bookId
              ? { ...lib, selectedOption: 'have-read' }
              : lib
          ),
        })
      );
    }
  };

  return (
    <div className={styles.select}>
      {savedOption === '' ? (
        <>
          <button onClick={() => setSelectedOption('have-read')}>
            Have read
          </button>
          <button onClick={() => setSelectedOption('want-to-read')}>
            Want to read
          </button>
        </>
      ) : savedOption === 'want-to-read' ? (
        <>
          <p className={styles.status}>Want to read this book</p>
          <button onClick={removeFromLibrary}>Remove book from library</button>
          <button onClick={updateToHaveRead}>Have read</button>
        </>
      ) : (
        <p className={styles.status}>Have read this book</p>
      )}
    </div>
  );
};

export default BookSaveButtons;
