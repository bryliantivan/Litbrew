import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { About, Book, Home, Menu, Order, } from './pages';
import { Nav, Footer } from './components';
import MenuDetail from './pages/MenuDetail';
import BookDetail from './pages/BookDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import MyOrder from './pages/MyOrder';
import Profile from './pages/Profile';

const App = () => {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/book/:id" element={<BookDetail/>}/>
          <Route path="/book" element={<Book />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<MenuDetail />} />
          <Route path="/order" element={<Order />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path="/myorder" element={<MyOrder />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;

