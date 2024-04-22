import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { commentProductAPI, getProductByIdAPI } from '../../api/product.api';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCartAPI } from '../../api/cart.api';
import { getUserProfileFromLS } from '../../utils/localStorage';
import { toast } from 'react-hot-toast';


const ProductDetail = () => {
    const navigate = useNavigate();
    const user = getUserProfileFromLS();
    const { productId } = useParams();
    const [comment, setComment] = useState('');

    const { data: productData, isSuccess, refetch } = useQuery({
        queryKey: ['products', productId],
        queryFn: () => getProductByIdAPI(productId)
    });

    const product = productData?.data?.data?.product;
    console.log(product);

    const handleAddToCart = async () => {
        if (isSuccess && product) {
            // Check if product is in stock
            if (product.current_quantity > 0) {
                try {
                    const cart = await addToCartAPI({
                        user_id: user.id,
                        product_id: product._id,
                        product_quantity: 1
                    });
                    console.log(cart);
                    toast.success('Product added to cart successfully!');
                } catch (error) {
                    toast.error('Failed to add product to cart. Please try again later.');
                    console.error('Error adding to cart:', error);
                }
            } else {
                toast.error('This product is currently out of stock.');
            }
        }
    };


    const handleBuyNow = async () => {
        if (isSuccess && product) {
            try {
                const cart = await addToCartAPI({
                    user_id: user.id,
                    product_id: product._id,
                    product_quantity: 1
                });
                console.log(cart);
                navigate(`/cart/getCart/${user.id}`);
                toast.success('Product added to cart successfully! Please proceed to checkout.')
            } catch (error) {
                console.error('Error buying now:', error);
                toast.error('Failed to buy product. Please login first!');
            }
            console.log(`Buying now: ${product.name}`);
        }
    };

    const handleCommentSubmit = async () => {
        try {
            if (!user) {
                toast.error('Please login first to comment!');
                navigate('/user/signin');
                return;
            }
            if (comment.trim() === '') {
                toast.error('Please write a comment before submitting!');
                return;
            }
            await commentProductAPI({
                user_id: user.id,
                product_id: productId,
                comment: comment
            });

            toast.success('Comment added successfully!');
            setComment('');
            // Refetch product data to update comments
            refetch();
        } catch (error) {
            console.error('Error commenting:', error);
            toast.error('Failed to comment! Please try again later.');
        }
    };

    const formatPriceVND = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' ₫';
    };


    return (
        <div className="font-sans bg-white mb-20">
            {isSuccess && product && (
                <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
                    <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-md p-6">
                        <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                            <div className="px-4 py-10 rounded-xl shadow-md relative">
                                <img src={product.image} alt={product.name} className="w-4/5 rounded object-cover" />
                            </div>
                        </div>
                        <div className="lg:col-span-2 flex flex-col justify-between">
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-3xl font-extrabold text-gray-800 mb-4">{product.name}</h3>
                                <p className="text-gray-700 mb-6">{product.description}</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-gray-700 flex items-center">
                                        <span className="font-semibold">Category:</span>&nbsp;{product.category.name}
                                    </div>
                                    <div className="text-gray-700 flex items-center">
                                        <span className="font-semibold">Brand:</span>&nbsp;{product.brand.name}
                                    </div>
                                    <div className="text-gray-700 flex items-center">
                                        {/* non breaking space */}
                                        <span className="font-semibold">Status:</span>&nbsp;{product.usage_status}
                                    </div>
                                    <div className="text-gray-700 flex items-center">
                                        <span className="font-semibold">Sold:</span>&nbsp;{product.quantity_sold}
                                    </div>
                                    <div className="text-gray-700 flex items-center">
                                        <span className="font-semibold">Current Quantity:</span>&nbsp;{product.current_quantity}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mt-8">Price: <span className="text-green-600">{formatPriceVND(product.price)}</span></h3>

                            </div>
                            <div className="mt-10">
                                <button onClick={handleBuyNow} type="button" className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white text-sm font-bold rounded-lg transition-colors duration-300 mb-2">Buy now</button>
                                <button onClick={handleAddToCart} type="button" className="w-full px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-bold rounded-lg transition-colors duration-300">Add to cart</button>
                            </div>
                        </div>


                    </div>
                </div>
            )}
            {isSuccess && product && (
                <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        <div className="lg:col-span-5">
                            <div className="bg-gray-100 rounded-lg shadow-md p-6">
                                {/* Previous comments */}
                                {product.comment && product.comment.length > 0 && (
                                    <div className="border-t border-gray-300 pt-4 mt-4">
                                        <h4 className="text-xl font-semibold mb-4">Previous Comments</h4>
                                        {product.comment.map((commentItem, index) => (
                                            <div key={index} className="bg-white rounded-lg p-3 mb-2 shadow-md">
                                                <p className="text-gray-800">{commentItem.comment}</p>
                                                <p className="text-gray-500 text-sm mt-2">Posted by: {commentItem.user_name}</p>
                                                <p className="text-gray-500 text-sm mt-2">Posted on: {new Date(commentItem.timestamp).toLocaleString()}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {/* Add Your Comment */}
                                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Add Your Comment</h3>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write your comment here..."
                                    className="border border-gray-300 rounded-lg p-3 mb-4 w-full resize-none focus:outline-none focus:border-blue-500"
                                />
                                {/* Add comment submit button */}
                                <button onClick={handleCommentSubmit} type="button" className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-bold rounded-lg transition duration-300 ease-in-out">Add Comment</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
