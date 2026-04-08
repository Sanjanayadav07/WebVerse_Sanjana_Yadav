import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaBars, FaUser, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl sm:text-2xl">🏠</span>
          <span className="text-lg sm:text-xl font-bold text-blue-600">
            Neighbourhood
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`hover:text-blue-600 ${location.pathname === '/' && "text-blue-600 font-bold"}`}
          >
            Home
          </Link>

          <Link
            to="/services"
            className={`hover:text-blue-600 ${location.pathname === '/services' && "text-blue-600 font-bold"}`}
          >
            Services
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 hover:text-blue-600">
                <FaUser /> Dashboard
              </Link>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">Login</Link>

              <Link
                to="/signup"
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3 shadow-md">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block py-2 border-b"
          >
            Home
          </Link>

          <Link
            to="/services"
            onClick={() => setMenuOpen(false)}
            className="block py-2 border-b"
          >
            Services
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block py-2 border-b"
              >
                Dashboard
              </Link>

              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-full text-left py-2 text-red-500 border-b"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block py-2 border-b"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block py-2 bg-blue-500 text-white text-center rounded"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;