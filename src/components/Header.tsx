import styles from './Header.module.css';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { openModal } from '../features/modal/modalSlice';
import { clearError, logoutUser, selectUser } from '../features/auth/authSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleModal = (formType: 'login' | 'register') => {
    dispatch(clearError());
    dispatch(openModal(formType));
  };

  const handleLogout = () => dispatch(logoutUser());

  return (
    <header className={styles.header}>
      <h1>Book Finder</h1>
      <div className={styles.nav}>
        {user && <p>{user?.email}</p>}
        <nav>
          {user ? (
            <button className={styles['nav-link']} onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
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
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
