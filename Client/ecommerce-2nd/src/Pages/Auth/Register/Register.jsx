import React, { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password, 'Confirm Password:', confirmPassword);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleGoogleLogin = () => {
    console.log('Logging in with Google');
  };

  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 p-12 bg-white rounded-md shadow-md">
      {/* Left Column - Images */}
      <div className="hidden lg:block">
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20230704/pngtree-office-essentials-technology-and-gadgets-illustration-featuring-laptop-printer-camera-tablet-image_3748458.jpg"
          alt="Left Column Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Column - Registration Form */}
      <div className="lg:col-span-1 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Your Account</h2>
        <form onSubmit={handleRegistration} className="relative group">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none relative group"
          >
            Register
            <div className="glass-effect absolute top-0 left-0 right-0 bottom-0 bg-white opacity-0 transition duration-300 group-hover:opacity-40 rounded-md backdrop-blur-md"></div>
          </button>
          <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-red-600 focus:outline-none"
        >
          Login with Google
        </button>
        </form>
      </div>
    </div>
  );
}
