import styles from './Header.module.css';

import { useAppDispatch } from '../app/hooks';
import { openModal } from '../features/modal/modalSlice';
import { clearError } from '../features/auth/authSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleModal = (formType: 'login' | 'register') => {
    dispatch(clearError());
    dispatch(openModal(formType));
  };

  return (
    <header className={styles.header}>
      <h1>Book Finder</h1>
      <nav>
        <button
          className={styles['nav-link']}
          onClick={() => handleModal('login')}
        >
          Login
        </button>
        <button
          className={styles['nav-link']}
          onClick={() => handleModal('register')}
        >
          Register
        </button>
      </nav>
    </header>
  );
};

export default Header;
