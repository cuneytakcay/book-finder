import styles from './RegisterModal.module.css';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Register</h2>
        <form>
          <label>Email:</label>
          <input className={styles.input} type='email' required />
          <label>Password:</label>
          <input className={styles.input} type='password' required />
          <button type='submit'>Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
