import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../constants';
import { useState, useEffect } from 'react';
import { IoPersonSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";



const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Fungsi untuk memeriksa token di localStorage
    const checkToken = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
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
            // Jika belum login, arahkan ke halaman login
            <Link to="/login">
              <button
                type="button"
                className="text-[#03151E] focus:ring-4 focus:outline-none focus:ring-blue-300 font-raleway font-semibold rounded-lg text-sm px-4 py-2 text-center bg-[#D1E9FF] hover:bg-[#57d0f8] transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                GET STARTED!
              </button>
            </Link>
          ) : (
            // Jika sudah login, tampilkan tombol LOG OUT
            <div className="relative">
              <button
                type="button"
                onClick={toggleDropdown}
                className="text-[#03151E] focus:ring-4 focus:outline-none focus:ring-blue-300 font-raleway font-semibold rounded-lg text-sm px-4 py-2 text-center transition-transform duration-300 ease-in-out transform hover:scale-105 flex items-center"
              >
                <div class="relative w-10 h-10 overflow-hidden rounded-full">
                  <svg class="absolute w-12 h-12 -left-1" fill="#D1E9FF" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                  </svg>
                </div>

              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-blue-100 rounded-md shadow-lg py-2 z-50 font-motter-corpus-std">
                  <Link
                    to="/myorder"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-300"

                  >
                    My Order
                  </Link>
                  <Link
                    to="/profile"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-300"

                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-300"
                  >
                    Log Out
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
