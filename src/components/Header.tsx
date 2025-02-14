import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { openModal } from '../features/modal/modalSlice';
import { clearError, logoutUser, selectUser } from '../features/auth/authSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleModal = (formType: 'login' | 'register') => {
    dispatch(clearError());
    dispatch(openModal(formType));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('user');
  };

  return (
    <header className={styles.header}>
      <h1>Book Finder</h1>
      <div className={styles.nav}>
        {user && (
          <button
            onClick={() => setDropdownVisible(!isDropdownVisible)}
            className={styles['nav-link']}
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
        )}
        <nav>
          {user && isDropdownVisible && (
            <div className={styles.dropdown}>
              <Link to='/mybooks' className='solid-btn'>
                Go to my books
              </Link>
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p>{user.email}</p>
            </div>
          )}
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
