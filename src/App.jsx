import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { About, Book, Home, Menu, Order } from './pages';
import { Nav, Footer } from './components';

const App = () => {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/book" element={<Book />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;