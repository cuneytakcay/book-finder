import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BookSearch from './features/books/BookSearch';
import BookDetail from './features/bookDetail/BookDetail';
import Footer from './components/Footer';
import ModalContainer from './features/modal/ModalContainer';
import LoginForm from './features/auth/LoginForm';
import RegisterForm from './features/auth/RegisterForm';
import './styles.css';

import { useAppSelector } from './app/hooks';
import {
  selectModalState,
  selectModalFormType,
} from './features/modal/modalSlice';

function App() {
  const isModalOpen = useAppSelector(selectModalState);
  const modalFormType = useAppSelector(selectModalFormType);

  return (
    <>
      <Header />
      <main className='container'>
        <Routes>
          <Route path='/' element={<BookSearch />} />
          <Route path='/book/:id' element={<BookDetail />} />
        </Routes>
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
