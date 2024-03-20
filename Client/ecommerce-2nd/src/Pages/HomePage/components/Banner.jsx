import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Banner = () => {
  const images = [
    'https://mir-s3-cdn-cf.behance.net/project_modules/fs/bc19cc91970635.5e3fa45ad2d37.jpg',
    'https://shopdunk.com/images/thumbs/0014159_ipadgen9_1600.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ebbfb3187857357.6592536b7ee7c.jpg',
    // Add more image URLs as needed
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  const fetchImage = () => {
    try {
      setCurrentImageUrl(images[currentImageIndex]);
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
