import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ILoginUser } from '../../types/Auth.type';
import Spinner from '../../components/Spinner';
import styles from './Form.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

// Redux toolkit
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsLoading, selectError, selectUser } from './authSlice';
import { loginUser } from './authActions';
import { closeModal, openModal } from '../modal/modalSlice';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
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
    // Close modal and navigate to home page if user is already logged in
    if (user) {
      dispatch(closeModal());
      navigate('/');
    }

    const subscription = watch((value) => {
      const emailValue = value.email || '';
      const passwordValue = value.password || '';
      setFormData({ email: emailValue, password: passwordValue });
    });
    return () => subscription.unsubscribe();
  }, [watch, user, navigate, dispatch]);

  const onSubmit = (data: ILoginUser) => dispatch(loginUser(data));

  return (
    <>
      {!isLoading ? (
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
                  {...register('password', {
                    required: 'Field cannot be empty',
                  })}
                />
              </label>
              {errors.password && (
                <p className={styles.error}>{errors.password.message}</p>
              )}
            </div>
            <button type='submit' className='solid-btn'>
              Login
            </button>
            <p>
              Don't have an account?{' '}
              <button
                type='button'
                className='link-btn'
                onClick={() => dispatch(openModal('register'))}
              >
                Register
              </button>
            </p>
          </form>
        </>
      ) : (
        <div className={styles.loading}>
          <Spinner spinnerText='Redirecting...' />
        </div>
      )}
    </>
  );
};

export default Login;
