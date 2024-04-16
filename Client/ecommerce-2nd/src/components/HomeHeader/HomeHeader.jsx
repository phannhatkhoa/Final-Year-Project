import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthProvider';
import { useContext } from 'react';
import { deleteUserProfileFromLS, getUserProfileFromLS } from '../../utils/localStorage';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility

  const handleLogout = () => {
    setIsAuthenticated(false);
    deleteUserProfileFromLS();
  };

  const userProfile = getUserProfileFromLS();

  return (
    <header className="bg-gradient-to-r from-yellow-400 to-red-500 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Ecommerce</h1>

        {/* Navigation menu */}
        <nav className="flex space-x-4">
      <ul className="flex space-x-4">
        <li>
          <Link
            to="/home"
            className={`text-white transition duration-300 ${location.pathname === '/home' ? 'text-yellow-200' : 'hover:text-yellow-200'}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/phone"
            className={`text-white transition duration-300 ${location.pathname === '/phone' ? 'text-yellow-200' : 'hover:text-yellow-200'}`}
          >
            Phone
          </Link>
        </li>
        <li>
          <Link
            to="/tablet"
            className={`text-white transition duration-300 ${location.pathname === '/tablet' ? 'text-yellow-200' : 'hover:text-yellow-200'}`}
          >
            Tablet
          </Link>
        </li>
        <li>
          <Link
            to="/laptop"
            className={`text-white transition duration-300 ${location.pathname === '/laptop' ? 'text-yellow-200' : 'hover:text-yellow-200'}`}
          >
            Laptop
          </Link>
        </li>
        <li>
          <Link
            to="/aboutUs"
            className={`text-white transition duration-300 ${location.pathname === '/aboutUs' ? 'text-yellow-200' : 'hover:text-yellow-200'}`}
          >
            About Us
          </Link>
        </li>
      </ul>
    </nav>

        {/* User actions */}
        <div className="flex items-center space-x-4 relative">
          {isAuthenticated ? (
            <>
              <div
                className="relative z-10"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <span className="text-white cursor-pointer">
                  Hello {userProfile?.email}
                </span>
                {showDropdown && (
                  <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg rounded-md py-2 w-40">
                    <Link to="/user/profile"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Manage Account
                    </Link>
                    <Link to={`/orderHistory/getOrderHistoryByUserId/${userProfile.id}`}
                      className="block px-4 py-2 hover:bg-gray-200">
                      Manage Order History
                    </Link>
                  </div>
                )}
              </div>
              <Link to={`/cart/getCart/${userProfile.id}`} className="text-yellow-500 hover:text-yellow-600">
                <FaShoppingCart className="mr-2 text-2xl" />
              </Link>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={`/cart/getCart/${userProfile.id}`} className="text-yellow-500 hover:text-yellow-600">
                <FaShoppingCart className="mr-2 text-2xl" />
              </Link>
              <Link to="/user/signin" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
