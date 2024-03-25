import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

export default function ProductDetailHeader() {

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

        {/* Search bar */}
        <div className="ml-4 relative">
          <input
            type="text"
            placeholder="Search for products..."
            //value={searchQuery}
            //onChange={handleSearchChange}
            className="w-full p-2 border border-gray-400 border-opacity-50 rounded focus:outline-none focus:border-purple-500 text-black bg-gray-200 placeholder-gray-500 text-sm"
          />
        </div>

        {/* User actions */}
        <a href="/cart">
          <button className="bg-yellow-500 text-gray-800 px-4 py-2 rounded hover:bg-yellow-600 transition duration-300">
            <FaShoppingCart className="mr-2" />
          </button>
        </a>
      </div>
    </header>
  )
}
