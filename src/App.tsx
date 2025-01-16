import Search from "./components/Search";
import BookDetail from "./components/BookDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";

function App() {
  return (
    <Router>
      <header className="header">
        <h1>Book Finder</h1>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
