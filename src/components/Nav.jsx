import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../constants';
import { useState, useEffect } from 'react';
import { IoPersonSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from 'axios'; // Import axios to make requests

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);  // To store user data

  useEffect(() => {
    // Fungsi untuk memeriksa token di localStorage
    const checkToken = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
      if (token) {
        fetchUserData(token);  // If logged in, fetch user data
      }
    };

    // Cek token saat komponen dimount
    checkToken();

    // Tambahkan event listener untuk mendeteksi perubahan localStorage
    window.addEventListener('storage', checkToken);

    // Pastikan event listener dihapus saat komponen unmount
    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, []);

  // Function to fetch user data from the API
  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('http://localhost:3000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setUser(response.data);  // Set the user data from the response
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);  // Clear user data on logout
    // Memicu event 'storage' secara manual agar komponen lain yang mendengarkan event ini (misalnya, Nav) ter-update
    window.dispatchEvent(new Event('storage'));
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-[#07779D] fixed w-full z-50 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logoLitbrew.svg" className="h-14" alt="Litbrew Logo" />
        </NavLink>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
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
            <div className="relative">
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
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-4 px-6 z-50 font-motter-corpus-std border border-gray-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gray-300">
                      {/* Placeholder for user avatar */}
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-800 mb-3">
                    <p>XP Points: {user.points}</p>
                  </div>
                  <Link
                    to="/myorder"
                    className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-300 rounded"
                  >
                    My Order
                  </Link>
                  <Link
                    to="/profile"
                    className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-300 rounded"
                  >
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-300 rounded"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#07779D]">
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
