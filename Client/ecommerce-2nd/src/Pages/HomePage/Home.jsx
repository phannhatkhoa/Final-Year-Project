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

  let products = null;
  productData && (
    products = productData.data.data.products
  );

  return (
    <div>
      <div className="mb-8">
        <Banner />
      </div>

      <div className="container mx-auto mb-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 border-b-4 border-black-500 w-3/4 mx-auto pb-2">Smart Phone</h2>
        <div className="container mx-auto mb-4">
          {products !== null && (
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <Link to={`/product/${product._id}`} key={product._id}>
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
