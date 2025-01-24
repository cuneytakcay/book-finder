import styles from './Header.module.css';

import { useAppDispatch } from '../app/hooks';
import { openModal } from '../features/modal/modalSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <header className={styles.header}>
      <h1>Book Finder</h1>
      <nav>
        <button
          className={styles['nav-link']}
          onClick={() => dispatch(openModal('login'))}
        >
          Login
        </button>
        <button
          className={styles['nav-link']}
          onClick={() => dispatch(openModal('register'))}
        >
          Register
        </button>
      </nav>
    </header>
  );
};

export default Header;
