import styles from './Header.module.css';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { useState } from 'react';

const Header: React.FC = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  return (
    <header className={styles.header}>
      <h1>Book Finder</h1>
      <nav>
        <button
          className={styles['nav-link']}
          onClick={() => setLoginOpen(true)}
        >
          Login
        </button>
        <button
          className={styles['nav-link']}
          onClick={() => setRegisterOpen(true)}
        >
          Register
        </button>
      </nav>
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
      />
    </header>
  );
};

export default Header;
