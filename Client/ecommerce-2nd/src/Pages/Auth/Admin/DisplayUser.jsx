import { useQuery } from "@tanstack/react-query";
import { getAllUserAPI } from "../../../api/admin.api";

export const UserPage = () => {
    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: getAllUserAPI
    });

    const handleEdit = () => {
        console.log('Edit user');
    }

    const handleDelete = (id) => {
        console.log(`Delete user with id: ${id}`);
    }

    return (
        <div className="overflow-x-auto">
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
                                    onClick={() => handleEdit(user)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleDelete(user.id)}
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
}
