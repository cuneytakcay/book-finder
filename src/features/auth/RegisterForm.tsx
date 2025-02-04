import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IRegisterUser } from '../../types/Auth.type';
import styles from './Form.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

// Redux toolkit
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsLoading, selectError } from './authSlice';
import { registerUser } from './authActions';
import { closeModal } from '../modal/modalSlice';

const Register: React.FC = () => {
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
  }, [watch]);

  const onSubmit = async (data: IRegisterUser) => {
    await dispatch(registerUser(data));
    dispatch(closeModal());
  };

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
        <div className={styles['input-wrapper']}>
          <label>
            First Name
            <input
              type='text'
              {...register('firstName', { required: 'Field cannot be empty' })}
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
              {...register('lastName', { required: 'Field cannot be empty' })}
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
                  value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
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
        <button type='submit' disabled={isLoading}>
          {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Register'}
        </button>
      </form>
    </>
  );
};

export default Register;
