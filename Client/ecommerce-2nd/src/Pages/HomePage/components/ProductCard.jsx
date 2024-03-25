import React from 'react';
import { FaCartPlus } from 'react-icons/fa';

const PhoneCard = ({ product }) => {
  return (
    <div className="max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
        style={{ aspectRatio: '16/9' }}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">{product.name}</div>
        <p className="text-gray-700">${product.price}</p>
      </div>
      <div className="flex justify-center pb-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-0.5">
          <FaCartPlus className="inline mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PhoneCard;
