import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import BookSearch from './features/books/BookSearch';
import BookDetail from './features/bookDetail/BookDetail';
import Footer from './components/Footer';
import ModalContainer from './features/modal/ModalContainer';
import LoginForm from './features/auth/LoginForm';
import RegisterForm from './features/auth/RegisterForm';
import './styles.css';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { setUserAndToken } from './features/auth/authSlice';
import {
  selectModalState,
  selectModalFormType,
} from './features/modal/modalSlice';

function App() {
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector(selectModalState);
  const modalFormType = useAppSelector(selectModalFormType);

  useEffect(() => {
    // Load user and token from local storage
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    // Dispatch an action to set the user in the store
    if (user) dispatch(setUserAndToken({ user: JSON.parse(user), token }));
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className='main'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<BookSearch />} />
            <Route path='/book/:id' element={<BookDetail />} />
          </Routes>
        </div>
      </main>
      <Footer />
      {isModalOpen && (
        <ModalContainer
          title={modalFormType === 'login' ? 'Login' : 'Register'}
        >
          {modalFormType === 'login' && <LoginForm />}
          {modalFormType === 'register' && <RegisterForm />}
        </ModalContainer>
      )}
    </>
  );
}

export default App;
