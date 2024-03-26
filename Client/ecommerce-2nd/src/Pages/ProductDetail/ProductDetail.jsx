import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductByIdAPI } from '../../api/product.api';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { productId } = useParams();
    const { data: productData, isSuccess } = useQuery({
        queryKey: ['products', productId],
        queryFn: () => getProductByIdAPI(productId)
    });

    const product = productData?.data?.data?.product;

    const handleAddToCart = () => {
        if (isSuccess && product) {
            console.log(`Added to the cart: ${product.name}`);
        }
    };

    const handleBuyNow = () => {
        if (isSuccess && product) {
            console.log(`Buying now: ${product.name}`);
        }
    };

    return (
        <div className="font-sans bg-white">
            {isSuccess && product && (
                <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
                    <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-md p-6">
                        <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                            <div className="px-4 py-10 rounded-xl shadow-md relative">
                                <img src={product.image} alt={product.name} className="w-4/5 rounded object-cover" />
                            </div>
                            {/* Other product images can be displayed here */}
                        </div>
                        <div className="lg:col-span-2 flex flex-col justify-between">
                            <div className="bg-gray-100 rounded-lg p-6 shadow-md">
                                <h3 className="text-2xl font-extrabold text-gray-800 mb-4">Product Name: {product.name}</h3>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Product Price: ${product.price}</h3>
                                <p className="text-gray-700 mb-4">Product Description: {product.description}</p>
                                <p className="text-gray-700 mb-4">Product Category: {product.category}</p>
                            </div>
                            <div className="mt-10">
                                <button onClick={handleBuyNow} type="button" className="min-w-[200px] px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white text-sm font-bold rounded-lg transition-colors duration-300 mt-4">Buy now</button>
                                <button onClick={handleAddToCart} type="button" className="min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-bold rounded-lg mt-4 transition-colors duration-300">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
