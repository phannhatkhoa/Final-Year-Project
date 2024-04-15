import React  from 'react';
import { getOrderHistoryAPI } from '../../api/orderHistory.api';
import { useParams } from 'react-router-dom';
import { getUserProfileFromLS } from '../../utils/localStorage';
import { useQuery } from '@tanstack/react-query';

const OrderHistory = () => {
    const userProfile = getUserProfileFromLS();
    const { user_id } = useParams();
    const { data: orderHistoryData } = useQuery({
        queryKey: ['orderHistory', user_id],
        queryFn: () => getOrderHistoryAPI(user_id),
    });

    return (
        <div className="container mx-auto px-4 md:px-8 py-8">
            <h1 className="text-2xl font-semibold mb-4 text-center">Order History for {userProfile.full_name}</h1>
            {orderHistoryData && (
                <div className="bg-white shadow-md rounded-md p-6">
                    <p className="text-lg mb-4">Order Date: {new Date(orderHistoryData.orderHistory.order_date).toLocaleString()}</p>
                    <h2 className="text-xl font-semibold mb-4">Products:</h2>
                    <ul className="space-y-4">
                        {orderHistoryData.orderHistory.products.map(product => (
                            <li key={product.product_id} className="border border-gray-200 rounded-md p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <img src={product.product_detail.image} alt={product.product_detail.name} className="w-16 h-16 rounded-md shadow-md" />
                                    <div>
                                        <h3 className="font-semibold text-lg">{product.product_detail.name}</h3>
                                        <p className="text-gray-500">${product.product_detail.price}</p>
                                    </div>
                                </div>
                                <div>
                                    <p>Quantity: {product.product_quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="text-xl font-semibold mt-6">Total Price: ${orderHistoryData.orderHistory.total_price}</p>
                </div>
            )}
        </div>
    );
}

export default OrderHistory;
