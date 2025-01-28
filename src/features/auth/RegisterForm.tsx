import { useState } from 'react';
import styles from './Form.module.css';

// Redux toolkit
import { useAppDispatch } from '../../app/hooks';
import { registerUser } from './authSlice';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();

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
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        First Name
        <input type='text' required name='firstName' onChange={handleChange} />
      </label>
      <label>
        Last Name
        <input type='text' required name='lastName' onChange={handleChange} />
      </label>
      <label>
        Email
        <input type='email' required name='email' onChange={handleChange} />
      </label>
      <label>
        Password
        <input
          type='password'
          required
          name='password'
          onChange={handleChange}
        />
      </label>
      <label>
        Confirm Password
        <input
          type='password'
          required
          name='confirm'
          onChange={handleChange}
        />
      </label>
      <button type='submit'>Register</button>
    </form>
  );
};

export default Register;
