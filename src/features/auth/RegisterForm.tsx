import { useState } from 'react';
import styles from './Form.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

// Redux toolkit
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectIsLoading,
  selectStatus,
  selectErrors,
  clearState,
} from './authSlice';
import { registerUser } from './authActions';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const { success, message } = useAppSelector(selectStatus);
  const errors = useAppSelector(selectErrors);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    dispatch(clearState());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  const createValidationMessage = (path: string) => {
    const errorMessage = errors.find((err) => err.path === path)?.msg;

    return errorMessage ? (
      <p className={styles.error}>
        <FontAwesomeIcon icon={faExclamationCircle} />
        {errorMessage}
      </p>
    ) : null;
  };

  return (
    <>
      {message && success ? (
        <div className={styles['success-container']}>
          <p className={styles.success}>
            <FontAwesomeIcon icon={faCheckCircle} />
            {message}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles['input-wrapper']}>
            <label>
              First Name
              <input
                type='text'
                required
                name='firstName'
                onChange={handleChange}
              />
            </label>
            {createValidationMessage('firstName')}
          </div>
          <div className={styles['input-wrapper']}>
            <label>
              Last Name
              <input
                type='text'
                required
                name='lastName'
                onChange={handleChange}
              />
            </label>
            {createValidationMessage('lastName')}
          </div>
          <div className={styles['input-wrapper']}>
            <label>
              Email
              <input
                type='email'
                required
                name='email'
                onChange={handleChange}
              />
            </label>
            {createValidationMessage('email')}
          </div>
          <div className={styles['input-wrapper']}>
            <label>
              Password
              <input
                type='password'
                required
                name='password'
                onChange={handleChange}
              />
            </label>
            {createValidationMessage('password')}
          </div>
          <div className={styles['input-wrapper']}>
            <label>
              Confirm Password
              <input
                type='password'
                required
                name='confirm'
                onChange={handleChange}
              />
            </label>
            {createValidationMessage('confirm')}
          </div>
          <button type='submit' disabled={isLoading}>
            {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Register'}
          </button>
        </form>
      )}
    </>
  );
};

export default Register;
