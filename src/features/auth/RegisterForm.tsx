import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IRegisterUser } from '../../types/Auth.type';
import Spinner from '../../components/Spinner';
import styles from './Form.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

// Redux toolkit
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsLoading, selectError, selectUser } from './authSlice';
import { registerUser } from './authActions';
import { closeModal, openModal } from '../modal/modalSlice';

const Register: React.FC = () => {
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm: '',
    },
  });

  const [formData, setFormData] = useState<IRegisterUser>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  });

  useEffect(() => {
    // Close modal and navigate to home page if user is already logged in
    if (user) {
      dispatch(closeModal());
      navigate('/');
    }

    const subscription = watch((value) => {
      const firstNameValue = value.firstName || '';
      const lastNameValue = value.lastName || '';
      const emailValue = value.email || '';
      const passwordValue = value.password || '';
      const confirmValue = value.confirm || '';

      setFormData({
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        password: passwordValue,
        confirm: confirmValue,
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, user, navigate, dispatch]);

  const onSubmit = (data: IRegisterUser) => dispatch(registerUser(data));

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
            <div className={styles['input-wrapper']}>
              <label>
                First Name
                <input
                  type='text'
                  {...register('firstName', {
                    required: 'Field cannot be empty',
                  })}
                />
              </label>
              {errors.firstName && (
                <p className={styles.error}>{errors.firstName.message}</p>
              )}
            </div>
            <div className={styles['input-wrapper']}>
              <label>
                Last Name
                <input
                  type='text'
                  {...register('lastName', {
                    required: 'Field cannot be empty',
                  })}
                />
              </label>
              {errors.lastName && (
                <p className={styles.error}>{errors.lastName.message}</p>
              )}
            </div>
            <div className={styles['input-wrapper']}>
              <label>
                Email
                <input
                  type='email'
                  {...register('email', {
                    required: 'Field cannot be empty',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Not a valid email address.',
                    },
                  })}
                />
              </label>
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>
            <div className={styles['input-wrapper']}>
              <label>
                Password
                <input
                  type='password'
                  {...register('password', {
                    required: 'Password is required.',
                    pattern: {
                      value:
                        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
                      message: `
                    Password must contain at least one number and at least one special
                    character and must be at least 8 characters long
                  `,
                    },
                  })}
                />
              </label>
              {errors.password && (
                <p className={styles.error}>{errors.password.message}</p>
              )}
            </div>
            <div className={styles['input-wrapper']}>
              <label>
                Confirm Password
                <input
                  type='password'
                  {...register('confirm', {
                    required: 'Password confirmation is required.',
                    validate: (value) =>
                      value === formData.password || 'Passwords do not match.',
                  })}
                />
              </label>
              {errors.confirm && (
                <p className={styles.error}>{errors.confirm.message}</p>
              )}
            </div>
            <button type='submit' className='solid-button'>
              Register
            </button>
            <p>
              Already have an account?{' '}
              <button
                type='button'
                className='link-btn'
                onClick={() => dispatch(openModal('login'))}
              >
                Login
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

export default Register;
