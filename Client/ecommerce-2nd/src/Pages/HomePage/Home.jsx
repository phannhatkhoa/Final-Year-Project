import React, { useState } from 'react';
import ProductCard from './components/ProductCard';
import Banner from './components/Banner';

export const Home = () => {
  const sampleProducts = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description for Product 1.',
      image: 'product1.jpg',
      price: 19.99,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description for Product 2.',
      image: 'product2.jpg',
      price: 24.99,
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description for Product 3.',
      image: 'product3.jpg',
      price: 29.99,
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Description for Product 3.',
      image: 'product3.jpg',
      price: 29.99,
    },
    {
      id: 5,
      name: 'Product 4',
      description: 'Description for Product 3.',
      image: 'product3.jpg',
      price: 29.99,
    },
    {
      id: 6,
      name: 'Product 4',
      description: 'Description for Product 3.',
      image: 'product3.jpg',
      price: 29.99,
    },
    {
      id: 7,
      name: 'Product 4',
      description: 'Description for Product 3.',
      image: 'product3.jpg',
      price: 29.99,
    },
    {
      id: 7,
      name: 'Product 4',
      description: 'Description for Product 3.',
      image: 'product3.jpg',
      price: 29.99,
    },
    {
      id: 7,
      name: 'Product 4',
      description: 'Description for Product 3.',
      image: 'product3.jpg',
      price: 29.99,
    },

  ];

  const productsPerRow = 4;
  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sampleProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sampleProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Banner />
      <div className="flex flex-wrap justify-center">
        {/* Displaying the first row with 4 products */}
        {currentProducts.slice(0, productsPerRow).map((product) => (
          <div key={product.id} className="w-1/4 p-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center mt-4">
        {/* Displaying the second row with the next 4 products */}
        {currentProducts.slice(productsPerRow).map((product) => (
          <div key={product.id} className="w-1/4 p-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-2 px-4 py-2 border ${currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'hover:bg-blue-500 hover:text-white'
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
