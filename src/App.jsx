import { Routes, Route, useLocation } from 'react-router-dom';
import { About, Book, Home, Menu, Order, MenuDetail, BookDetail, Login, Register, MyOrder, Profile, Review, OrderTracking, AdminHome, AdminManageMenu, AdminManageBook, AdminManageOrders, AdminAddItem, AdminEditItem, AdminReturnBook } from './pages';
import { Nav, Footer } from './components';
import PrivateRoute from './context/PrivateRoute';

const App = () => {
    const location = useLocation();

    return (
        <>
            <Nav />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/Home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/login" element={<PrivateRoute><Login /></PrivateRoute>} />
                <Route path="/register" element={<PrivateRoute><Register /></PrivateRoute>} />
                <Route path="/about" element={<About />} />

                {/* Protected Routes for Logged-in Users */}
                <Route path="/book/:id" element={<PrivateRoute><BookDetail /></PrivateRoute>} />
                <Route path="/book" element={<PrivateRoute><Book /></PrivateRoute>} />
                <Route path="/menu" element={<PrivateRoute><Menu /></PrivateRoute>} />
                <Route path="/menu/:id" element={<PrivateRoute><MenuDetail /></PrivateRoute>} />
                <Route path="/order" element={<PrivateRoute><Order /></PrivateRoute>} />
                <Route path="/myorders" element={<PrivateRoute><MyOrder /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/review/:orderId" element={<PrivateRoute><Review /></PrivateRoute>} />
                <Route path="/ordertracking/:orderId" element={<PrivateRoute><OrderTracking /></PrivateRoute>} />

                {/* Admin Routes protected by PrivateRoute */}
                <Route path="/AdminHome" element={<PrivateRoute isAdminRoute={true}><AdminHome /></PrivateRoute>} />
                <Route path="/AdminManageMenu" element={<PrivateRoute isAdminRoute={true}><AdminManageMenu /></PrivateRoute>} />
                <Route path="/AdminManageBook" element={<PrivateRoute isAdminRoute={true}><AdminManageBook /></PrivateRoute>} />
                <Route path="/AdminManageOrders" element={<PrivateRoute isAdminRoute={true}><AdminManageOrders /></PrivateRoute>} />
                <Route path="/AdminAddItem" element={<PrivateRoute isAdminRoute={true}><AdminAddItem /></PrivateRoute>} />
                <Route path="/AdminEditItem/:id" element={<PrivateRoute isAdminRoute={true}><AdminEditItem /></PrivateRoute>} />
                <Route path="/AdminReturnBook" element={<PrivateRoute isAdminRoute={true}><AdminReturnBook /></PrivateRoute>} />
            </Routes>
            {/* Show footer for non-admin routes */}
            {!location.pathname.startsWith('/Admin') && <Footer />}
        </>
    );
};

export default App;
