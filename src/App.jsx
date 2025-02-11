import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { About, Book, Home, Menu, Order, MenuDetail, BookDetail, Login, Register, MyOrder, Profile, Review} from './pages';
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
          <Route path="/book/:id" element={<BookDetail/>}/>
          <Route path="/book" element={<Book />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<MenuDetail />} />
          <Route path="/order" element={<Order />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path="/myorder" element={<MyOrder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;

