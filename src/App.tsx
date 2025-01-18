import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import BookDetail from './components/BookDetail';
import Footer from './components/Footer';
import ModalContainer from './components/ModalContainer';
import Login from './components/Login';
import Register from './components/Register';
import './styles.css';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleModalStatus = () => setModalOpen(!isModalOpen);

  const handleLoginStatus = () => {
    setIsLogin(true);
    setIsRegister(false);
    setModalOpen(true);
  };

  const handleRegisterStatus = () => {
    setIsRegister(true);
    setIsLogin(false);
    setModalOpen(true);
  };

  return (
    <Router>
      <Header
        onLoginClick={handleLoginStatus}
        onRegisterClick={handleRegisterStatus}
      />
      <main className='container'>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/book/:id' element={<BookDetail />} />
        </Routes>
      </main>
      <Footer />
      {isModalOpen && (
        <ModalContainer
          title={isLogin ? 'Login' : 'Register'}
          onClick={handleModalStatus}
        >
          {isLogin && <Login />}
          {isRegister && <Register />}
        </ModalContainer>
      )}
    </Router>
  );
}

export default App;
