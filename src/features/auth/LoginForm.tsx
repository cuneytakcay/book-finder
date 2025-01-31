import { useState } from 'react';
import styles from './Form.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

// Redux toolkit
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsLoading, selectStatus, clearState } from './authSlice';
import { loginUser } from './authActions';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const { success, message } = useAppSelector(selectStatus);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <>
      {message && !success && (
        <p className={styles.fail}>
          <FontAwesomeIcon icon={faExclamationCircle} />
          {message}
        </p>
      )}
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label>
          Email
          <input
            type='email'
            name='email'
            required
            onChange={(e) => {
              setEmail(e.target.value);
              dispatch(clearState());
            }}
          />
        </label>
        <label>
          Password
          <input
            type='password'
            name='password'
            required
            onChange={(e) => {
              setPassword(e.target.value);
              dispatch(clearState());
            }}
          />
        </label>
        <button type='submit' disabled={isLoading}>
          {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Login'}
        </button>
      </form>
    </>
  );
};

export default Login;
