import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrderHistoryAdminAPI, updateOrderStatusAPI } from '../../../api/admin.api';
import { toast } from 'react-hot-toast';

const ManageOrder = () => {
    const { data: getOrderHistoryData, refetch } = useQuery({
        queryKey: ['getallorderHistory'],
        queryFn: () => getOrderHistoryAdminAPI(),
    });
    console.log(getOrderHistoryData);

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await updateOrderStatusAPI(orderId, newStatus);
            toast.success('Order status updated successfully');
            await refetch();
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 md:px-8 py-8 mb-20">
            <h1 className="text-2xl font-bold text-center mb-4">Manage Order</h1>
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Order Date</th>
                        <th className="py-3 px-6 text-left">Products</th>
                        <th className="py-3 px-6 text-left">Total Price</th>
                        <th className="py-3 px-6 text-left">Order Status</th>
                    </tr>
                </thead>
                <tbody>
                    {getOrderHistoryData && getOrderHistoryData.orderHistory.map(order => (
                        <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left whitespace-nowrap">{new Date(order.order_date).toLocaleString()}</td>
                            <td className="py-3 px-6 text-left">
                                <ul>
                                    {order.products.map(product => (
                                        <li key={product.product_id}>{product.product_detail.name} x {product.product_quantity}</li>
                                    ))}
                                </ul>
                            </td>
                            <td className="py-3 px-6 text-left">{order.total_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            <td className="py-3 px-6 text-left">
                                <select
                                    value={order.order_status}
                                    onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                    className="border border-gray-200 rounded-md py-1 px-2"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Shipping">Shipping</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageOrder;
