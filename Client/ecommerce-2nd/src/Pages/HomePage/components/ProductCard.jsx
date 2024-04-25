import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false); // State to track if the icon is clicked

  // Function to toggle the like state
  const toggleLike = (event) => {
    event.preventDefault(); // Prevent default behavior of click event
    setIsLiked(!isLiked);
  };

  const truncateProductName = (name, maxLength) => {
    return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
  };
  const formatPrice = (price) => {
    // Convert the price string to a number
    const priceNumber = parseInt(price);

    // Format the number with commas every three digits
    const formattedPrice = priceNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Append '₫' for Vietnamese Dong
    return formattedPrice + ' ₫';
  };


  return (
    <div className="max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
        style={{ aspectRatio: '16/9' }}
      />
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-2">
          <div className="font-bold text-xl text-gray-800">
            {truncateProductName(product.name, 20)}
          </div>
          <div onClick={toggleLike}>
            <FaHeart
              className={`text-xl cursor-pointer ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
              onClick={toggleLike}
            />
          </div>
        </div>
        <p className="text-gray-700">Price: {formatPrice(product.price)}</p>
        <p className="text-gray-700">Brand: {product.brand.name}</p>
        {product.current_quantity > 0 ? (
          <p className="text-gray-700">Sold: {product.quantity_sold}</p>
        ) : (
          <p className="text-red-500">SOLD OUT</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
