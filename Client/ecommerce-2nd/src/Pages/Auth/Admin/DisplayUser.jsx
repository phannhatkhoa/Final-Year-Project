import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { deleteUserAPI, getAllUserAPI, updateUserRoleAPI } from "../../../api/admin.api";
import { toast } from "react-hot-toast";

export const UserPage = () => {
    const { data, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: getAllUserAPI
    });

    console.log('Data:', data);

    const [selectedUserId, setSelectedUserId] = useState(null);
    const [showRoleOptions, setShowRoleOptions] = useState(false);

    const handleEdit = (id) => {
        setSelectedUserId(id);
        setShowRoleOptions(true);
    };

    const handleRoleSelection = async (role) => {
        if (selectedUserId) {
            try {
                await updateUserRoleAPI(selectedUserId, role);
                toast.success('Role updated successfully');
                await refetch();
            } catch (error) {
                toast.error('Failed to update role. Please try again.');
                console.log('Error:', error);
            }
        }
        setShowRoleOptions(false);
        setSelectedUserId(null);
    };

    const handleDelete = async (id) => {
        console.log('Delete user:', id);
        try {
            await deleteUserAPI(id);
            toast.success('User deleted successfully');
            await refetch();
        } catch (error) {
            console.log('Error:', error);
        }
    };
    const handleCancel = () => {
        setShowRoleOptions(false);
        setSelectedUserId(null);
    };

    return (
        <div className="overflow-x-auto">
            <h1 className="text-2xl font-bold text-center mb-4">Manage User</h1>
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">DOB</th>
                        <th className="py-3 px-6 text-left">Location</th>
                        <th className="py-3 px-6 text-left">Role</th>
                        <th className="py-3 px-6 text-left">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {data && data.users.map((user, index) => (
                        <tr key={`${user.id}-${index}`} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left whitespace-nowrap font-bold">{user.email}</td>
                            <td className="py-3 px-6 text-left font-bold">{user.full_name}</td>
                            <td className="py-3 px-6 text-left font-bold">{user.date_of_birth}</td>
                            <td className="py-3 px-6 text-left font-bold">{user.location}</td>
                            <td className="py-3 px-6 text-left font-bold">{user.role}</td>
                            <td className="py-3 px-6 text-left space-x-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleEdit(user._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showRoleOptions && (
                <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
                        <h2 className="text-lg font-bold mb-4">Select Role</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleRoleSelection('admin')}
                            >
                                admin
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleRoleSelection('customer')}
                            >
                                customer
                            </button>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
