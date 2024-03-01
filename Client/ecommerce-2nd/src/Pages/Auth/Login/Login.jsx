import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
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

      {/* Right Column - Login Form */}
      <div className="lg:col-span-1 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="relative group">
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none relative group"
          >
            Login
            <div className="glass-effect absolute top-0 left-0 right-0 bottom-0 bg-white opacity-0 transition duration-300 group-hover:opacity-40 rounded-md backdrop-blur-md"></div>
          </button>
        </form>

      <div className="flex items-center mt-4">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="mx-4 text-sm text-gray-500">OR</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

        {/* Google Login Button */}
        <div className="mt-4">
          <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-red-600 focus:outline-none"
        >
          Login with Google
        </button>
        </div>

        {/* Registration Link */}
        <p className="mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
