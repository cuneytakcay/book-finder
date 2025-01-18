import styles from './Header.module.css';

interface HeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onRegisterClick }) => {
  return (
    <header className={styles.header}>
      <h1>Book Finder</h1>
      <nav>
        <button className={styles['nav-link']} onClick={onLoginClick}>
          Login
        </button>
        <button className={styles['nav-link']} onClick={onRegisterClick}>
          Register
        </button>
      </nav>
    </header>
  );
};

export default Header;
