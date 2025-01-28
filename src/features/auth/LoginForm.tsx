import styles from './Form.module.css';

const Login: React.FC = () => {
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
      <button type='submit'>Login</button>
    </form>
  );
};

export default Login;
