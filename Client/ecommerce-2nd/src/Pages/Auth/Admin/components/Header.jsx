import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider';


const AdminHeader = () => {
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate('/user/signin');
    };

    return (
        <header className="bg-gray-800 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-wide">Admin Panel</h1>
                <nav className="space-x-6">
                    <Link to="/admin/getUser" className="hover:text-blue-500">Manage User</Link>
                    <Link to="/admin/getProducts" className="hover:text-blue-500">Manage Product</Link>
                    <Link to="/admin/getCart" className="hover:text-blue-500">Manage Cart</Link>
                    <button onClick={handleLogout} className="hover:text-blue-500 focus:outline-none">Logout</button>
                </nav>
            </div>
        </header>
    );
};

export default AdminHeader;
