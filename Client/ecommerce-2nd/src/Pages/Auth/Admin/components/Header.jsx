import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { getUserProfileFromLS } from '../../../../utils/localStorage';

const AdminHeader = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const userProfile = getUserProfileFromLS();
    const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate('/user/signin');
    };


    return (
        <header className="bg-gray-800 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-wide">Admin Panel</h1>

                <div className="flex items-center space-x-4 relative">
                    {isAuthenticated ? (
                        <>
                            <div
                                className="relative z-10"
                                onMouseEnter={() => setShowDropdown(true)}
                                onMouseLeave={() => setShowDropdown(false)}
                            >
                                <span className="text-white cursor-pointer">
                                    Hello {userProfile?.email}
                                </span>
                                {showDropdown && (
                                    <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg rounded-md py-2 w-40">
                                        <Link to="/user/profile"
                                            className="block px-4 py-2 hover:bg-gray-200"
                                        >
                                            Manage Account
                                        </Link>
                                        <Link to="/admin/getUser" className="block px-4 py-2 hover:bg-gray-200">
                                            Manage User
                                        </Link>
                                        <Link to="/admin/createProduct" className="block px-4 py-2 hover:bg-gray-200">
                                            Add Product
                                        </Link>
                                        <Link to="/admin/getProducts" className="block px-4 py-2 hover:bg-gray-200">
                                            Manage Product
                                        </Link>
                                        <Link to="/admin/getOrderHistory" className="block px-4 py-2 hover:bg-gray-200">
                                            Order History
                                        </Link>
                                    </div>
                                )}
                            </div>
                            {userProfile && (
                                <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
                                    Logout
                                </button>
                            )}

                        </>
                    ) : (
                        <>
                            {userProfile && (
                                <Link to="/user/signin" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
                                    Login
                                </Link>
                            )}

                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
