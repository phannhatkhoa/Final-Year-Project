import React, { useState } from 'react';
import Banner from './components/Banner';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductAPI } from '../../api/product.api';
import { getCategoryAPI } from '../../api/category.api';
import ProductCard from './components/ProductCard';
import { FaSearch } from 'react-icons/fa';

export const Phone = () => {
    const [sortBy, setSortBy] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { data: productData } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProductAPI()
    });

    const { data: categoryData } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategoryAPI()
    });

    let products = null;
    if (productData && productData.data) {
        products = productData.data.data.products;
    }
    
    let categories = null;
    if (categoryData && categoryData.data) {
        categories = categoryData.data.data.categories;
    }
    console.log(categories);

    // Get the category object for "Smart Phone"
    const smartPhoneCategory = categories.find(category => category.name === "Smart Phone");

    // Filter products based on the category ID of "Smart Phone"
    const smartPhoneProducts = products.filter(product => product.category_id === smartPhoneCategory?._id);

    // Sorting products
    if (smartPhoneProducts) {
        if (sortBy === 'priceLowToHigh') {
            smartPhoneProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'priceHighToLow') {
            smartPhoneProducts.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'nameAZ') {
            smartPhoneProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'nameZA') {
            smartPhoneProducts.sort((a, b) => b.name.localeCompare(a.name));
        }
    }

    // Filter products based on search query
    let filteredProducts = smartPhoneProducts;
    if (searchQuery) {
        filteredProducts = smartPhoneProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return (
        <div>
            <div className="mt4 mb-8">
                <Banner />
            </div>

            <div className="relative mb-4 flex justify-center">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full px-10 py-3 pl-12 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition duration-300 ease-in-out"
                    />
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <FaSearch className="h-5 w-5 text-gray-400" />
                    </span>
                </div>
            </div>

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

                {smartPhoneCategory && (
                    <div key={smartPhoneCategory._id}>
                        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 border-b-4 border-black-500 w-3/4 mx-auto pb-2">{smartPhoneCategory.name}</h2>
                        <div className="container mx-auto mb-4">
                            {filteredProducts && (
                                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {filteredProducts.map(product => (
                                        <div key={product._id}>
                                            <Link to={`/product/getProduct/${product._id}`}>
                                                <ProductCard product={product} />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
