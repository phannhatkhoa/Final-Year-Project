import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function AuthHeader() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-gradient-to-r from-yellow-400 to-red-500 text-white py-4">
            <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-wide">Ecommerce</h1>

                <div className="hidden md:flex space-x-4">
                    <Link to="/" className="hover:text-gray-400">Home</Link>
                    <Link to="/home" className="hover:text-gray-400">Shop</Link>
                    <Link to="#" className="hover:text-gray-400">About Us</Link>
                    <Link to="#" className="hover:text-gray-400">Contact</Link>
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
                    <Link to="#" className="block px-4 py-2 hover:bg-gray-700">Home</Link>
                    <Link to="#" className="block px-4 py-2 hover:bg-gray-700">Shop</Link>
                    <Link to="#" className="block px-4 py-2 hover:bg-gray-700">About Us</Link>
                    <Link to="#" className="block px-4 py-2 hover:bg-gray-700">Contact</Link>
                </div>
            )}
        </header>
    );
}
