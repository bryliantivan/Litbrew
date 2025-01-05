import { NavLink } from 'react-router-dom';
import { navLinks } from '../constants';

const Nav = () => {
  return (
    <nav className="bg-[#07779D] fixed w-full z-50 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logoLitbrew.svg" className="h-14" alt="Litbrew Logo" />
        </NavLink>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button" className="text-[#03151E] focus:ring-4 focus:outline-none focus:ring-blue-300 font-raleway font-medium rounded-lg text-sm px-4 py-2 text-center bg-[#D1E9FF] hover:bg-[#57d0f8]">GET STARTED!</button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#07779D]">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    isActive ? 'text-[#D1E9FF] font-bold font-raleway hover:text-white border-b-2 border-white' : 'text-[#D1E9FF] font-raleway hover:text-white'
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