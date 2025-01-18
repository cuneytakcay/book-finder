import styles from './ModalForm.module.css';

const Register: React.FC = () => {
  return (
    <form className={styles.form}>
      <label>
        Email
        <input type='email' required />
      </label>
      <label>
        Password
        <input type='password' required />
      </label>
      <button type='submit'>Register</button>
    </form>
  );
};

export default Register;
