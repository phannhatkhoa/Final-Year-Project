import React, { useState, useEffect } from 'react';

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    'https://9to5mac.com/wp-content/uploads/sites/6/2023/06/iOS-17-wallpaper.jpg?quality=82&strip=all',
    'https://i.pcmag.com/imagery/articles/04vAVvyEiZPyaGSMNOkO9UP-7.fit_lim.v1662667011.jpg',
    'https://wallpapers.com/images/featured/laptop-murjp1nk4lp1idlt.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);


  return (
    <div className="relative">
      <img src={images[currentImageIndex]} alt="Banner" className="w-full h-21 object-cover object-top" />
      <div className="absolute inset-0 flex justify-center items-center">
      </div>
    </div>


  );
};


export default Banner;
