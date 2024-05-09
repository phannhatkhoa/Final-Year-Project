import React from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfileFromLS } from '../../utils/localStorage';
import { useQuery } from '@tanstack/react-query';
import { getOrderHistoryAPI } from '../../api/orderHistory.api';

const OrderHistory = () => {
    const userProfile = getUserProfileFromLS();
    const { user_id } = useParams();
    const { data: orderHistoryData } = useQuery({
        queryKey: ['orderHistory', user_id],
        queryFn: () => getOrderHistoryAPI(user_id),
    });

    const formatPriceVND = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' ₫';
    };
    return (
        <div className="container mx-auto px-4 md:px-8 py-8 mb-20">
            <h1 className="text-3xl font-semibold mb-8 text-center text-gray-900">Order History for {userProfile.full_name}</h1>
            {orderHistoryData && orderHistoryData.orderHistory.map(order => (
                <div key={order._id} className="bg-white shadow-md rounded-md p-6 mb-8">
                    <p className="text-lg mb-4 text-gray-800">Order Date: {new Date(order.order_date).toLocaleString()}</p>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">Products:</h2>
                    <ul className="space-y-4">
                        {order.products.map(product => (
                            <li key={product.product_id} className="border border-gray-200 rounded-md p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <img src={product.product_detail.image} alt={product.product_detail.name} className="w-20 h-20 rounded-md shadow-md" />
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-900">{product.product_detail.name}</h3>
                                        <p className="text-gray-600">Price: {formatPriceVND(product.product_detail.price)}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-800">Quantity: {product.product_quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between mt-6">
                        <p className="text-2xl font-semibold text-gray-900">Total Price: {order.total_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        <p className="text-2xl font-semibold text-gray-900">Order Status: {order.order_status}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OrderHistory;
