import React, { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import { deleteUserProfileFromLS, getUserProfileFromLS } from '../../../utils/localStorage';

export default function CartHeader() {

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const handleLogout = () => {
    setIsAuthenticated(false);
    deleteUserProfileFromLS();
  };

  const userProfile = getUserProfileFromLS();

  return (
    <header className="bg-gradient-to-r from-yellow-400 to-red-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Shopee logo */}
        <div className="text-3xl font-extrabold">
          <span className="text-yellow-100">Ecomm</span>
          <span className="text-white">erce</span>
        </div>

        {/* Navigation menu */}
        <nav className="flex space-x-4">
          <ul className="flex space-x-4">
            <li>
              <a href="/home" className="text-white hover:text-yellow-200 transition duration-300">
                Shop
              </a>
              <hr className="border-t-2 border-yellow-200" />
            </li>
            <li>
              <a href="/phones" className="text-white hover:text-yellow-200 transition duration-300">
                Phone
              </a>
            </li>
            <li>
              <a href="/tablets" className="text-white hover:text-yellow-200 transition duration-300">
                Tablet
              </a>
            </li>
            <li>
              <a href="/laptops" className="text-white hover:text-yellow-200 transition duration-300">
                Laptop
              </a>
            </li>
          </ul>
        </nav>

        {/* User actions */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <a href="/user/profile" className="text-white">Hello {userProfile.email}</a>
              <Link to={`/cart/getCart/${userProfile.id}`} className="text-yellow-500 hover:text-yellow-600"> {/* Use Link component */}
                <FaShoppingCart className="text-2xl" />
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
              <Link to="/user/signin" className="text-white hover:text-yellow-200 transition duration-300">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
