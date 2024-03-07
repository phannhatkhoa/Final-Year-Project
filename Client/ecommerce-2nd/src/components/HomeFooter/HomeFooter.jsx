import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function HomeFooter() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-6">
          <a href="#!" className="social-icon hover:text-blue-500">
            <FaFacebook size={24} />
          </a>
          <a href="#!" className="social-icon hover:text-blue-400">
            <FaTwitter size={24} />
          </a>
          <a href="#!" className="social-icon hover:text-red-500">
            <FaInstagram size={24} />
          </a>
          <a href="#!" className="social-icon hover:text-gray-400">
            <FaEnvelope size={24} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-6">
          <div className="md:mb-6">
            <p className="font-semibold">Subscribe to our newsletter</p>
          </div>
          <div className="relative md:mb-6">
            <input
              type="text"
              id="newsletterInput"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-400 border-opacity-50 rounded focus:outline-none text-black"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="newsletter-btn hover:bg-blue-500 px-4 py-2 rounded-full"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Subscribe
            </button>
          </div>
        </div>

        <div className="mb-6 text-center">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-6">
            <h5 className="mb-4 font-bold uppercase">Useful Links</h5>
            <ul className="list-none">
              <li><a href="#!" className="text-gray-300 hover:text-white">Link 1</a></li>
              <li><a href="#!" className="text-gray-300 hover:text-white">Link 2</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full p-4 text-center bg-opacity-75 bg-gray-800">
        © 2023 Copyright:
        <a
          className="text-blue-500 hover:underline"
          href="https://tw-elements.com/"
        >
          TW elements
        </a>
      </div>
    </footer>
  );
}
