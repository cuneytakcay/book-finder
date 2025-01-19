import styles from './ModalForm.module.css';

const Register: React.FC = () => {
  return (
    <form className={styles.form}>
      <label>
        First Name
        <input type='text' required />
      </label>
      <label>
        Last Name
        <input type='text' required />
      </label>
      <label>
        Email
        <input type='email' required />
      </label>
      <label>
        Password
        <input type='password' required />
      </label>
      <label>
        Confirm Password
        <input type='password' required />
      </label>
      <button type='submit'>Register</button>
    </form>
  );
};

export default Register;
