import { Link, NavLink, useNavigate } from 'react-router-dom';
import { navLinks, navLinksAdmin } from '../constants'; // Make sure the path to constants.js is correct
import { useState, useEffect, useCallback } from 'react';
import { IoPersonSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { xp } from '../assets/images';
import axios from 'axios';

const Nav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [loadingUser, setLoadingUser] = useState(false);
    const [userError, setUserError] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const navigate = useNavigate(); 

    const autoRefresh = () => {
        navigate(url);
        window.location.reload();
    }

    useEffect(() => {
        checkToken();
        loadCart(); 

        window.addEventListener('storage', () => {
            checkToken(); // 🔥 Pastikan navbar update saat token berubah
            loadCart();  // 🔥 Pastikan cart tetap diperbarui juga
        });
        return () => {
            window.removeEventListener('storage', () => {
                checkToken();
                loadCart();
            });
        };
    }, []);

    // 🔥 Tambahkan useEffect ini agar `cart` selalu update tanpa refresh
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const checkToken = useCallback(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        if (token) fetchUserData(token);
    }, []);

    const handleStorageChange = () => {
        loadCart();
    };

    const loadCart = () => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    };

    const fetchUserData = async (token) => {
        setLoadingUser(true);
        setUserError(null);
        try {
            const response = await axios.get('http://localhost:3000/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            if (error.response && error.response.status === 401) {
                handleLogout();
                setUserError("Your session has expired. Please log in again.");
            } else {
                setUserError("Failed to load user data. Please try again.");
            }
        } finally {
            setLoadingUser(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.setItem('cart', JSON.stringify([]));
        setIsLoggedIn(false);
        setUser(null);
        setCart([]);
        window.dispatchEvent(new Event('storage'));
        setDropdownOpen(false);
        navigate('/login');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // 🔥 Perbaiki `updateCart` agar memicu perubahan di `localStorage`
    const updateCart = (product, action) => {
        let newCart = [...cart];
        const existingProductIndex = cart.findIndex(item => item._id === product._id);

        if (action === "add") {
            if (existingProductIndex > -1) {
                newCart[existingProductIndex].quantity += 1;
            } else {
                newCart.push({ ...product, quantity: 1 });
            }
        } else if (action === "remove") {
            newCart = cart.filter(item => item._id !== product._id);
        } else if (action === "decrement") {
            if (existingProductIndex > -1) {
                newCart[existingProductIndex].quantity -= 1;
                if (newCart[existingProductIndex].quantity === 0) {
                    newCart.splice(existingProductIndex, 1);
                }
            }
        }

        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        window.dispatchEvent(new Event("storage")); // 🔥 Memicu perubahan di `Nav.jsx`
    };

    // Close dropdown when user changes (navigates to another page)
    useEffect(() => {
        setDropdownOpen(false);
    }, [user]);

    return (
        <nav className="bg-[#07779D] fixed w-full z-50 top-0 start-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/logoLitbrew.svg" className="h-14" alt="Litbrew Logo" />
                </NavLink>

                <div className="flex max-md:ml-auto md:order-2 space-x-4 rtl:space-x-reverse">
                    {!isLoggedIn ? (
                        <Link to="/login">
                            <button
                                type="button"
                                className="text-[#03151E] focus:ring-4 focus:outline-none focus:ring-blue-300 font-raleway font-semibold rounded-lg text-sm px-4 py-2 text-center bg-[#D1E9FF] hover:bg-[#57d0f8] transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                                GET STARTED!
                            </button>
                        </Link>
                    ) : (
                        <>
                            {/* Only show cart icon if user is not an admin */}
                            {!user?.isAdmin && (
                                <div className="relative flex">
                                    <Link to="/order">
                                        <div className="relative py-2">
                                            {cart.length > 0 && (
                                                <div className="absolute top-3 left-5">
                                                    <p className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-1 mx-auto text-xs text-white">
                                                        {cart.length}
                                                    </p>
                                                </div>
                                            )}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mt-[20%] h-8 w-8 text-blue-200">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                            </svg>
                                        </div>
                                    </Link>
                                </div>
                            )}

                            <div>
                                <button
                                    type="button"
                                    onClick={toggleDropdown}
                                    className="text-[#03151E] focus:ring-4 focus:outline-none focus:ring-blue-300 font-raleway font-semibold rounded-lg text-sm px-4 py-2 text-center transition-transform duration-300 ease-in-out transform hover:scale-105 flex items-center"
                                >
                                    <div className="relative w-10 h-10 overflow-hidden rounded-full">
                                        <img 
                                            src={user?.profilePicture || "/default-avatar.png"} 
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </button>
                                {dropdownOpen && user && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-4 px-6 z-50 font-raleway font-bold border border-gray-200">
                                        {/* Kondisi untuk admin */}
                                        {user.isAdmin ? (
                                            <div>
                                                <button
                                                    onClick={handleLogout}
                                                    className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-300 rounded"
                                                >
                                                    Sign Out
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                {/* Isi dropdown untuk pengguna biasa */}
                                                {loadingUser ? (
                                                    <p>Loading user data...</p>
                                                ) : userError ? (
                                                    <p className="text-red-500">{userError}</p>
                                                ) : (
                                                    <>
                                                        <div className="flex items-center space-x-3 mb-3">
                                                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                                                <img 
                                                                    src={user?.profilePicture || "/default-avatar.png"} 
                                                                    alt="User Avatar" 
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-gray-800 font-semibold">{user.name}</p>
                                                                <p className="text-xs text-gray-500">{user.email}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-[0.5vw] text-l text-gray-800 mb-3">
                                                            <img src={xp} alt="XP Icon" />
                                                            <p>XP Points: {user.points}</p>
                                                        </div>
                                                        <div>
                                                            <Link
                                                                to="/order"
                                                                className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-300 rounded"
                                                                onClick={() => autoRefresh()}
                                                            >
                                                                My Order
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <Link
                                                                to="/profile"
                                                                className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-300 rounded"
                                                                onClick={() => autoRefresh()}
                                                            >
                                                                Profile Settings
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <button
                                                                onClick={handleLogout}
                                                                className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-300 rounded"
                                                            >
                                                                Sign Out
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Hamburger button for mobile view */}
                <button
                    onClick={toggleMobileMenu}
                    type="button"
                    className="inline-flex my-auto items-center mr-[3vw] p-2 w-10 h-10 justify-center mt-2 text-blue-200 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 text-xl focus:ring-gray-200 dark:text-gray-400"
                    aria-controls="navbar-sticky"
                    aria-expanded={isMobileMenuOpen}
                >
                    
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>

                {/* Navigation links, conditionally rendered based on mobile menu state */}
                <div className={`${isMobileMenuOpen ? '' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#07779D]">
                        {user && user.isAdmin ? (
                            navLinksAdmin.map((link) => (
                                <li key={link.label}>
                                    <NavLink
                                        to={link.href}
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'text-[#D1E9FF] font-bold font-raleway hover:text-white border-b-2 border-white'
                                                : 'text-[#D1E9FF] font-raleway hover:text-white'
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))
                        ) : (
                            navLinks.map((link) => (
                                <li key={link.label}>
                                    <NavLink
                                        to={link.href}
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'text-[#D1E9FF] font-bold font-raleway hover:text-white border-b-2 border-white'
                                                : 'text-[#D1E9FF] font-raleway hover:text-white'
                                        }
                                        onClick={autoRefresh}
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;