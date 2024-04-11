import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProductAPI } from '../../../api/admin.api';

export const DisplayProduct = () => {
    const { data } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProductAPI,
    });
    console.log('Data:', data);
    const handleEdit = (product) => {
        console.log('Edit product:', product);
    };

    const handleDelete = (productId) => {
        console.log('Delete product with ID:', productId);
    };

    return (
        <div className="overflow-x-auto ">
            <h1 className="text-2xl font-bold text-center mb-4">Manage Product</h1>
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Current Quantity</th>
                        <th className="py-3 px-6 text-left">Quantity Sold</th>
                        <th className="py-3 px-6 text-left">Category Name</th>
                        <th className="py-3 px-6 text-left">Brand Name</th>
                        <th className="py-3 px-6 text-left">Usage Status</th>
                        <th className="py-3 px-6 text-left">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {data && data.products && data.products.map((product, index) => (
                        <tr
                            key={`${product.id}-${index}`}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            <td className="py-3 px-6 text-left whitespace-nowrap font-bold">
                                {product.name}
                            </td>
                            <td className="py-3 px-6 text-left font-bold">
                                {product.current_quantity}
                            </td>
                            <td className="py-3 px-6 text-left font-bold">
                                {product.quantity_sold}
                            </td>
                            <td className="py-3 px-6 text-left font-bold">
                                {product.category.name}
                            </td>
                            <td className="py-3 px-6 text-left font-bold">
                                {product.brand.name}
                            </td>
                            <td className="py-3 px-6 text-left font-bold">
                                {product.usage_status}
                            </td>
                            <td className="py-3 px-6 text-left space-x-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleEdit(product)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
