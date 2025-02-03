import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ILoginUser } from '../../types/Auth.type';
import styles from './Form.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

// Redux toolkit
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsLoading, selectError } from './authSlice';
import { loginUser } from './authActions';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  // Frontend form validation
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [formData, setFormData] = useState<ILoginUser>({
    email: '',
    password: '',
  });

  useEffect(() => {
    const subscription = watch((value) => {
      const emailValue = value.email || '';
      const passwordValue = value.password || '';
      setFormData({ email: emailValue, password: passwordValue });
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: ILoginUser) => dispatch(loginUser(data));

  return (
    <>
      {error && (
        <p className={styles['login-error']}>
          <FontAwesomeIcon icon={faExclamationCircle} />
          {error}
        </p>
      )}
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div
          className={
            formData.email.length > 0
              ? `${styles['input-wrapper']} filled`
              : styles['input-wrapper']
          }
        >
          <label>
            Email
            <input
              type='email'
              {...register('email', { required: 'Field cannot be empty' })}
            />
          </label>
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div
          className={
            formData.password.length > 0
              ? `${styles['input-wrapper']} filled`
              : styles['input-wrapper']
          }
        >
          <label>
            Password
            <input
              type='password'
              {...register('password', { required: 'Field cannot be empty' })}
            />
          </label>
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <button type='submit' disabled={isLoading}>
          {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Login'}
        </button>
      </form>
    </>
  );
};

export default Login;
