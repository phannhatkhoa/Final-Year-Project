import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';


export default function AuthHeader() {
    const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
<header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">YourLogo</h1>
        </div>

        <div className="hidden md:flex space-x-4">
          <a href="/" className="hover:text-gray-400">Home</a>
          <a href="/" className="hover:text-gray-400">Shop</a>
          <a href="#" className="hover:text-gray-400">About Us</a>
          <a href="#" className="hover:text-gray-400">Contact</a>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Responsive Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white py-2">
          <a href="#" className="block px-4 py-2 hover:bg-gray-700">Home</a>
          <a href="/register" className="block px-4 py-2 hover:bg-gray-700">Shop</a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-700">About Us</a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-700">Contact</a>
        </div>
      )}
    </header>  )
}
