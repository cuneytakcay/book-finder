import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { openModal } from '../features/modal/modalSlice';
import { clearError, logoutUser, selectUser } from '../features/auth/authSlice';

const Header: React.FC = () => {
  const navigate = useNavigate();
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
    setDropdownVisible(false);
    navigate('/');
    dispatch(openModal('login'));
  };

  return (
    <header className={styles.header}>
      <h1>Book Finder</h1>
      <div className={styles.nav}>
        <Link
          to='/'
          className={styles['nav-link'] + ' ' + styles['icon-btn']}
          onClick={() => setDropdownVisible(false)}
        >
          <FontAwesomeIcon icon={faHome} />
        </Link>
        {user && (
          <button
            onClick={() => setDropdownVisible(!isDropdownVisible)}
            className={styles['nav-link'] + ' ' + styles['icon-btn']}
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
        )}
        <nav>
          {user && isDropdownVisible && (
            <div className={styles.dropdown}>
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p>{user.email}</p>
              <Link
                to='/mybooks'
                onClick={() => setDropdownVisible(false)}
                className={styles.ddlink}
              >
                Go to my books
              </Link>
              <button className={styles.ddlink} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
          {!user && (
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
