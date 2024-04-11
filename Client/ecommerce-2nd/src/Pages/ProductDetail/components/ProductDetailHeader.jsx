import React, { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { deleteUserProfileFromLS, getUserProfileFromLS } from '../../../utils/localStorage';
import { AuthContext } from '../../../contexts/AuthProvider';
import { Link } from 'react-router-dom';

export default function ProductDetailHeader() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const userProfile = getUserProfileFromLS();

  const handleLogout = () => {
    setIsAuthenticated(false);
    deleteUserProfileFromLS();
  };

  return (
    <header className="bg-gradient-to-r from-yellow-400 to-red-500 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Ecommerce</h1>

        {/* Navigation menu */}
        <nav className="flex space-x-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/home" className="text-white hover:text-yellow-200 transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/phone" className="text-white hover:text-yellow-200 transition duration-300">
                Phone
              </Link>
            </li>
            <li>
              <Link to="/tablet" className="text-white hover:text-yellow-200 transition duration-300">
                Tablet
              </Link>
            </li>
            <li>
              <Link to="/laptop" className="text-white hover:text-yellow-200 transition duration-300">
                Laptop
              </Link>
            </li>
            <li>
              <Link to="/aboutUs" className="text-white hover:text-yellow-200 transition duration-300">
                About Us
              </Link>
            </li>
          </ul>
        </nav>

        {/* User actions */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <a href="/user/profile" className="text-white">Hello {userProfile?.email}</a>
              {userProfile && (
                <Link to={`/cart/getCart/${userProfile.id}`} className="text-yellow-500 hover:text-yellow-600">
                  <FaShoppingCart className="text-2xl" />
                </Link>
              )}
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
                Logout
              </button>
            </>
          ) : (
            <>
              {userProfile && (
                <Link to={`/cart/getCart/${userProfile.id}`} className="text-yellow-500 hover:text-yellow-600">
                  <FaShoppingCart className="mr-2 text-2xl" />
                </Link>
              )}
              <Link to="/user/signin" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
