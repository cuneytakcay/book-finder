import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BookSearch from './features/books/BookSearch';
import BookDetail from './features/bookDetail/BookDetail';
import Footer from './components/Footer';
import ModalContainer from './features/modal/ModalContainer';
import ModalLoginForm from './features/modal/ModalLoginForm';
import ModalRegisterForm from './features/modal/ModalRegisterForm';
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
          {modalFormType === 'login' && <ModalLoginForm />}
          {modalFormType === 'register' && <ModalRegisterForm />}
        </ModalContainer>
      )}
    </>
  );
}

export default App;
