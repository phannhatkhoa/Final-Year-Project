import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Banner = () => {
  const images = [
    'https://m-cdn.phonearena.com/images/article/131659-wide-two_1200/Best-HD-wallpapers-for-iPad-2021.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/fs/bc19cc91970635.5e3fa45ad2d37.jpg',
    // Add more image URLs as needed
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  const fetchImage = async () => {
    try {
      const response = await fetch(images[currentImageIndex]);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setCurrentImageUrl(imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [currentImageIndex]);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <img
        src={currentImageUrl}
        alt={`Banner ${currentImageIndex + 1}`}
        className="w-full h-full object-cover transition-transform duration-300 transform rounded-lg shadow-lg"
        style={{ transform: `translateX(${-currentImageIndex * 100}%)` }}
      />

      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-4 rounded-full"
        onClick={handlePrevClick}
      >
        <FaChevronLeft className="text-2xl" />
      </button>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-4 rounded-full"
        onClick={handleNextClick}
      >
        <FaChevronRight className="text-2xl" />
      </button>
    </div>
  );
};

export default Banner;
