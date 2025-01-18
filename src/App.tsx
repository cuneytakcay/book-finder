import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import BookDetail from './components/BookDetail';
import Footer from './components/Footer';
import './styles.css';

function App() {
  return (
    <Router>
      <Header />
      <main className='container'>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/book/:id' element={<BookDetail />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
