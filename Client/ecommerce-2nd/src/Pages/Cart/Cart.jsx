import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getCartAPI } from '../../api/cart.api';
import { useParams } from 'react-router-dom';

const ShoppingCart = () => {
    const { user_id } = useParams();
    const {data: cartData} = useQuery({
        queryKey: ['cart'],
        queryFn: () => getCartAPI(user_id),
        onSuccess: (data) => {
            console.log(data); 
            console.log(data.cart);
        }
    });
    
    console.log(cartData);


    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (cartData && cartData.cart && cartData.cart.products) {
            setCart(cartData.cart.products);
        }
    }, [cartData]);

    const handleQuantityChange = (id, value) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.product_id === id ? { ...item, product_quantity: Math.max(1, item.product_quantity + value) } : item
            )
        );
    };

    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('DPD');
    const [shippingFee, setShippingFee] = useState(8);

    const handleDeliveryOptionChange = (event) => {
        const selectedDeliveryOption = event.target.value;
        setSelectedDeliveryOption(selectedDeliveryOption);
        switch (selectedDeliveryOption) {
            case 'DPD':
                setShippingFee(8);
                break;
            case 'FedEx':
                setShippingFee(10);
                break;
            case 'USPS':
                setShippingFee(5);
                break;
            default:
                setShippingFee(0);
                break;
        }
    };

    // Calculate subtotal and totalAmount based on cart state
    const subtotal = cart.reduce((acc, item) => acc + item.product_quantity * item.price, 0);
    const totalAmount = subtotal + shippingFee;

    return (
        <div className="container mx-auto py-8">
            {/* Order Details */}
            <div className="flex justify-start items-start space-y-6 flex-col md:flex-row md:space-y-0 md:space-x-8">
                <div className="space-y-2">
                    <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order #13432</h1>
                    <p className="text-base font-medium leading-6 text-gray-600">21st March 2021 at 10:34 PM</p>
                </div>
            </div>
            {/* Product List and Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {/* Left Column - Product List */}
                <div className="col-span-3 md:col-span-2 space-y-4">
                    {cart.map(item => (
                        <div key={item.product_id} className="border border-gray-200 rounded-md p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img src={`https://via.placeholder.com/50x50?text=${item.product_id}`} alt={item.product_id} className="w-16 h-16 rounded-md shadow-md" />
                                <div>
                                    <h3 className="font-semibold text-lg">{item.product_id}</h3>
                                    <p className="text-gray-500">${item.price}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => handleQuantityChange(item.product_id, -1)} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md">-</button>
                                <span className="px-3 py-1 bg-gray-100 rounded-md">{item.product_quantity}</span>
                                <button onClick={() => handleQuantityChange(item.product_id, 1)} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md">+</button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Right Column */}
                <div className="col-span-3 md:col-span-1 space-y-4">
                    {/* Shipping */}
                    <div className="border rounded-md p-4 bg-gray-100">
                        <h2 className="text-lg font-semibold mb-4">Shipping</h2>
                        {/* Dropdown for selecting delivery option */}
                        <div className="mb-4">
                            <label htmlFor="deliveryOption" className="block text-sm font-medium text-gray-700">Select Delivery Option:</label>
                            <select id="deliveryOption" name="deliveryOption" className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-gray-500 focus:border-gray-500" onChange={handleDeliveryOptionChange}>
                                <option value="DPD">DPD Delivery - $8.00 (Delivery within 24 Hours)</option>
                                <option value="FedEx">FedEx Express - $10.00 (Delivery within 48 Hours)</option>
                                <option value="USPS">USPS Standard - $5.00 (Delivery within 5-7 Business Days)</option>
                            </select>
                        </div>
                    </div>
                    {/* Summary */}
                    <div className="border rounded-md p-4 bg-gray-100 mb-4">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-700">Subtotal:</span>
                            <span className="font-semibold">${subtotal}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-700">Shipping Fee:</span>
                            <span className="font-semibold">${shippingFee}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between">
                            <span className="font-semibold text-lg">Total:</span>
                            <span className="font-semibold text-lg">${totalAmount}</span>
                        </div>
                    </div>
                    {/* Payment Button */}
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md w-full mb-4">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
