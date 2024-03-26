import React, { useState } from 'react';
import Banner from './components/Banner';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductAPI } from '../../api/product.api';
import PhoneCard from './components/ProductCard';

export const Home = () => {
  const { data: productData } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProductAPI()
  });

  const [sortBy, setSortBy] = useState(''); // State for sorting option

  let products = null;
  if (productData) {
    products = productData.data.data.products;

    // Sorting products based on selected option
    if (sortBy === 'priceLowToHigh') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHighToLow') {
      products.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'nameAZ') {
      products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'nameZA') {
      products.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  return (
    <div>
      <div className="mb-8">
        <Banner />
      </div>

      <div className="container mx-auto mb-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 border-b-4 border-black-500 w-3/4 mx-auto pb-2">Smart Phone</h2>
        <div className="container mx-auto mb-4">
          <div className="flex justify-end mb-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-md"
            >
              <option value="">Sort by...</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="nameAZ">Name: A-Z</option>
              <option value="nameZA">Name: Z-A</option>
            </select>
          </div>
          {products !== null && (
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <Link to={`/product/getProduct/${product._id}`} key={product._id}>
                  <PhoneCard product={product} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto mb-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 border-b-4 border-black-500 w-3/4 mx-auto pb-2">Laptop</h2>
      </div>
    </div>
  );
};
