import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function AuthFooter() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-wrap justify-between items-start">
        <div className="w-full md:w-1/3 lg:w-1/4 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">Connect with Us</h2>
          <div className="flex space-x-4">
            <Link to="#" className="text-gray-400 hover:text-white">
              <FaFacebook />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white">
              <FaTwitter />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white">
              <FaInstagram />
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/3 lg:w-1/4 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
          <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates and promotions.</p>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Your email"
              className="bg-gray-800 text-white py-2 px-4 rounded-l focus:outline-none"
            />
            <button className="bg-blue-500 text-white py-2 px-4 rounded-r hover:bg-blue-600 focus:outline-none">
              Subscribe
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/3 lg:w-1/4">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-400 mb-4">658 Ngo Quyen</p>
          <p className="text-gray-400 mb-4">Email: khoapngcd201807@fpt.edu.vn</p>
          <p className="text-gray-400">Phone: 0898996102</p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-800 pt-4">
        <div className="flex justify-between items-center">
          <div className="text-sm">&copy; 2024 Ecommerce Website For Sell Used Product</div>
          <div className="flex space-x-4">
            <Link to="#" className="hover:text-gray-400">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-gray-400">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-gray-400">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
