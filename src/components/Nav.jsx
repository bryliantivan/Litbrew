import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../constants';
import { useState, useEffect } from 'react';
import { IoPersonSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { xp } from '../assets/images';  // Pastikan path ini benar
import axios from 'axios';

const Nav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [loadingUser, setLoadingUser] = useState(false); // State untuk loading indicator
    const [userError, setUserError] = useState(null); // State untuk error message
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for hamburger menu
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    // Function to check the token in localStorage
    const checkToken = () => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        if (token) {
            fetchUserData(token);
        }
    };

    useEffect(() => {
        checkToken();
        window.addEventListener('storage', checkToken);
        return () => {
            window.removeEventListener('storage', checkToken);
        };
    }, []);

    // useEffect to synchronize cart with localStorage.  This is now simpler.
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);


    const fetchUserData = async (token) => {
        setLoadingUser(true); // Set loading to true
        setUserError(null);    // Reset error
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
                // Token expired or invalid
                handleLogout(); // Log the user out
                setUserError("Your session has expired. Please log in again.");
            } else {
                setUserError("Failed to load user data. Please try again."); // Set error message
            }
        } finally {
            setLoadingUser(false); // Set loading to false
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
        setCart([]);
        localStorage.setItem('cart', JSON.stringify([])); // Clear cart in localStorage
        window.dispatchEvent(new Event('storage')); // Trigger storage event
        setDropdownOpen(false); //close dropdown
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        console.log("dropdown activated!");
    };

    // Function to handle adding/removing products from the cart
    const updateCart = (product, action) => {
        let newCart;
        if (action === "add") {
            const existingProductIndex = cart.findIndex(item => item._id === product._id);
            if (existingProductIndex > -1) {
                // Product already exists, update quantity
                newCart = [...cart];
                newCart[existingProductIndex].quantity = (newCart[existingProductIndex].quantity || 1) + 1;
            } else {
                // New product, add to cart with quantity 1
                newCart = [...cart, { ...product, quantity: 1 }];
            }
        } else if (action === "remove") {
            newCart = cart.filter(item => item._id !== product._id); // Remove product from cart
        }
        setCart(newCart);
    };

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
                            {console.log("User is logged in")}
                            <div className="relative flex">
                                <Link to="/order">
                                    <div className="relative py-2">
                                        {cart.length > 0 && (
                                            <div className="absolute top-4 left-5">
                                                <p className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-1 text-xs text-white">
                                                    {cart.length}
                                                </p>
                                            </div>
                                        )}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mt-4 h-8 w-8 text-blue-200">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                        </svg>
                                    </div>
                                </Link>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={toggleDropdown}
                                    className="text-[#03151E] focus:ring-4 focus:outline-none focus:ring-blue-300 font-raleway font-semibold rounded-lg text-sm px-4 py-2 text-center transition-transform duration-300 ease-in-out transform hover:scale-105 flex items-center"
                                >
                                    <div className="relative w-10 h-10 overflow-hidden rounded-full">
                                        <svg className="absolute w-12 h-12 -left-1" fill="#D1E9FF" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                </button>
                                {dropdownOpen && user && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-4 px-6 z-50 font-raleway font-bold border border-gray-200">
                                        {loadingUser ? (
                                            <p>Loading user data...</p>
                                        ) : userError ? (
                                            <p className="text-red-500">{userError}</p>
                                        ) : (
                                            <>
                                                <div className="flex items-center space-x-3 mb-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-300">
                                                        {/* Placeholder for user avatar */}
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
                                                    >
                                                        My Order
                                                    </Link>
                                                </div>

                                                <div>
                                                    <Link
                                                        to="/profile"
                                                        className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-300 rounded"
                                                    >
                                                        Profile Settings
                                                    </Link>
                                                </div>

                                                <button
                                                    onClick={handleLogout}
                                                    className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-300 rounded"
                                                >
                                                    Sign Out
                                                </button>
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
                    className="inline-flex items-center mr-[3vw] p-2 w-10 h-10 justify-center mt-2 text-blue-200 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 text-xl focus:ring-gray-200 dark:text-gray-400"
                    aria-controls="navbar-sticky"
                    aria-expanded={isMobileMenuOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>

                {/* Navigation links, conditionally rendered based on mobile menu state */}
                <div className={`${isMobileMenuOpen ? '' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#07779D]">
                        {navLinks.map((link) => (
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
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;