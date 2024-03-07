// Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-yellow-400 to-red-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Shopee logo */}
        <div className="text-3xl font-extrabold">
          <span className="text-yellow-100">Sho</span>
          <span className="text-white">pee</span>
        </div>

        {/* Search bar */}
        <div className="ml-4 relative">
          <input
            type="text"
            placeholder="Search for products..."
            //value={searchQuery}
            //onChange={handleSearchChange}
            className="w-100 p-2 border border-gray-400 border-opacity-50 rounded focus:outline-none focus:border-purple-500 text-black bg-gray-200 placeholder-gray-500 text-sm"
          />
          </div>

        {/* User actions */}
        <div className="flex items-center space-x-4">
          <a href="/login">
          <button className="text-white hover:text-yellow-200 transition duration-300">
            Login
          </button>
          </a>

          <a href="/register">
          <button className="bg-yellow-500 text-gray-800 px-4 py-2 rounded hover:bg-yellow-600 transition duration-300">
            Sign Up
          </button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
