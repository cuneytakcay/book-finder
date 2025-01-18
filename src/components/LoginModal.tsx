import styles from './LoginModal.module.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Login</h2>
        <form>
          <label>Email:</label>
          <input className={styles.input} type='email' required />
          <label>Password:</label>
          <input className={styles.input} type='password' required />
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
