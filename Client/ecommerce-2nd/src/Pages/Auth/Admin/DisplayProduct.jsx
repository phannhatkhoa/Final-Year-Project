import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { deleteProductAPI, editProductAPI, getAllProductAPI } from '../../../api/admin.api';
import { toast } from 'react-hot-toast';

export const DisplayProduct = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Number of products per page


    const { data, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProductAPI,
    });


    const [editing, setEditing] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); // State to manage selected product for editing
    const [formData, setFormData] = useState({
        name: '',
        current_quantity: '',
        quantity_sold: '',
        usage_status: '',
        price: '',
    });

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setFormData({
            name: product.name,
            current_quantity: product.current_quantity,
            quantity_sold: product.quantity_sold,
            usage_status: product.usage_status,
            price: product.price,
        });
        setEditing(true);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setUpdating(true);
            await editProductAPI(selectedProduct._id, formData);
            await refetch();
            setEditing(false);
        } catch (error) {
            console.error('Error updating product:', error);
        } finally {
            setUpdating(false);
        }
        toast.success('Product updated successfully!');
    }

    const totalPages = Math.ceil((data?.products?.length || 0) / pageSize);

    const paginatedData = data && data.products && data.products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    const handleDelete = async (id) => {
        console.log('Delete product:', id);
        try {
            await deleteProductAPI(id);
            toast.success('Product deleted successfully');
            await refetch();
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div className="overflow-x-auto mb-20">
            <h1 className="text-2xl font-bold text-center mb-4">Manage Product</h1>
            <table className="min-w-full table-auto">
                {/* Table header */}
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
                    {/* Product rows */}
                    {paginatedData && paginatedData.map((product, index) => (
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
                                    onClick={() => handleEditClick(product)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={`mx-1 px-3 py-1 border ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'} hover:bg-gray-200`}
                        onClick={() => changePage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {editing && (
                <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-4">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Edit Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Name */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="text-gray-800 bg-gray-100 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500" />
                            </div>
                            {/* Current Quantity */}
                            <div className="mb-4">
                                <label htmlFor="current_quantity" className="block text-gray-700 font-semibold mb-2">Current Quantity</label>
                                <input type="text" id="current_quantity" name="current_quantity" value={formData.current_quantity} onChange={(e) => setFormData({ ...formData, current_quantity: e.target.value })} className="text-gray-800 bg-gray-100 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500" />
                            </div>
                            {/* Quantity Sold */}
                            <div className="mb-4">
                                <label htmlFor="quantity_sold" className="block text-gray-700 font-semibold mb-2">Quantity Sold</label>
                                <input type="text" id="quantity_sold" name="quantity_sold" value={formData.quantity_sold} onChange={(e) => setFormData({ ...formData, quantity_sold: e.target.value })} className="text-gray-800 bg-gray-100 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500" />
                            </div>
                            {/* Usage Status */}
                            <div className="mb-4">
                                <label htmlFor="usage_status" className="block text-gray-700 font-semibold mb-2">Usage Status</label>
                                <input type="text" id="usage_status" name="usage_status" value={formData.usage_status} onChange={(e) => setFormData({ ...formData, usage_status: e.target.value })} className="text-gray-800 bg-gray-100 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500" />
                            </div>
                            {/* Price */}
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Price</label>
                                <input type="text" id="price" name="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="text-gray-800 bg-gray-100 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500" />
                            </div>
                        </div>
                        {/* Buttons */}
                        <div className="flex justify-between mt-6">
                            <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-md cursor-pointer hover:bg-blue-600 transition duration-300">
                                {updating ? 'Updating...' : 'Update Product'}
                            </button>
                            <button type="button" onClick={() => setEditing(false)} className="bg-gray-300 text-gray-800 py-2 px-6 rounded-md cursor-pointer hover:bg-gray-400 transition duration-300">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
