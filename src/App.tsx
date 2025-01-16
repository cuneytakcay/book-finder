import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import BookDetail from './components/BookDetail';
import './styles.css';

function App() {
  return (
    <Router>
      <header className='header'>
        <h1>Book Finder</h1>
      </header>
      <main className='container'>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/book/:id' element={<BookDetail />} />
        </Routes>
      </main>
      <footer className='footer'>
        <p>Book Finder © 2024</p>
      </footer>
    </Router>
  );
}

export default App;
