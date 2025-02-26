import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { About, Book, Home, Menu, Order, MenuDetail, BookDetail, Login, Register, MyOrder, Profile, Review, OrderTracking, AdminHome, AdminManageMenu, AdminManageBook, AdminManageOrders, AdminAddItem, AdminEditItem} from './pages';
import { Nav, Footer } from './components';
import PrivateRoute from './context/PrivateRoute';

const App = () => {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/book" element={<Book />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<MenuDetail />} />
          <Route path="/order" element={<Order />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/myorders" element={<MyOrder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/review/:orderId" element={<Review />} />
          <Route path="/ordertracking/:orderId" element={<OrderTracking />} />
          

          {/* Admin Routes protected by PrivateRoute */}
          <Route path="/AdminHome" element={
            <PrivateRoute>
              <AdminHome />
            </PrivateRoute>
          } />
          <Route path="/AdminManageMenu" element={
            <PrivateRoute>
              <AdminManageMenu />
            </PrivateRoute>
          } />
          <Route path="/AdminManageBook" element={
            <PrivateRoute>
              <AdminManageBook />
            </PrivateRoute>
          } />
          <Route path="/AdminManageOrders" element={
            <PrivateRoute>
              <AdminManageOrders />
            </PrivateRoute>
          } />
          <Route path="/AdminAddItem" element={
            <PrivateRoute>
              <AdminAddItem />
            </PrivateRoute>
          } />
          <Route path="/AdminEditItem/:id" element={
            <PrivateRoute>
              <AdminEditItem />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;

